const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');

const Restaurant = require('./models/restaurant.js');
const mongodb = require('./mongodb');

mongodb.connect();

const city = 'Jakarta';
const scrapPromises = [];

for (let i = 9; i <= 10; i += 1) {
  const page = i > 1 ? `?page=${i}` : '';

  scrapPromises.push(new Promise((resolve, reject) => {
    axios.get(`https://www.zomato.com/jakarta/restaurants/coffee-tea${page}`)
      .then((res) => {
        const $ = cheerio.load(res.data);
        const restaurantPromises = [];

        $('.search-card').each((index, element) => {
          const name = $(element).find('.result-title').text().trim();
          const establishments = $(element).find('.res-snippet-small-establishment').find('a').map(function () {
            return $(this).text().trim();
          }).get().join(', ');
          const cuisines = $(element).find('.search-page-text').find('.nowrap').find('a').map(function () {
            return $(this).text().trim();
          }).get().join(', ');
          let rating = $(element).find('.res-rating-nf').text().trim();
          const costForTwo = $(element).find('.res-cost').text().trim().replace(/\D+/g, '');
          const openingHours = $(element).find('.res-timing').find('.search-grid-right-text').text().trim();
          const phone = $(element).find('.res-snippet-ph-info').attr('data-phone-no-str').trim();
          const locality = $(element).find('.search_result_subzone').text().trim();
          const address = $(element).find('.search-result-address').text().trim();
          const imageUrl = $(element).find('.search_left_featured').find('a').attr('data-original').trim();
          const pageUrl = $(element).find('.result-title').attr('href').trim();

          rating = rating === 'NEW' ? 0 : rating;

          restaurantPromises.push(axios.get(pageUrl)
            .then((response) => {
              const $ = cheerio.load(response.data);
              const latitude = $("meta[property='place:location:latitude']").attr('content');
              const longitude = $("meta[property='place:location:longitude']").attr('content');

              const restaurant = {
                name,
                rating,
                establishments,
                cuisines,
                costForTwo,
                openingHours,
                phone,
                imageUrl,
                locality,
                address,
                city,
                latitude,
                longitude,
              };

              console.log(`Adding restaurant ${restaurant.name} into promise`);

              return restaurant;
            }).catch(() => {
              // handle error
            }));
        });

        Promise.all(restaurantPromises).then((restaurants) => {
          const insertPromises = [];
          const downloadPromises = [];

          restaurants.forEach((restaurant) => {
            if (!restaurant) {
              return false;
            }

            const { imageUrl } = restaurant;
            const imagePath = '/../public/images';
            const imageName = `${md5(imageUrl)}.jpg`;

            downloadPromises.push(axios.get(imageUrl, { responseType: 'arraybuffer' })
              .then((response) => {
                const imageFullPath = path.join(__dirname, `${imagePath}/restaurants/${imageName}`);
                fs.writeFileSync(imageFullPath, response.data);
                console.log(`Downloading image of restaurant ${restaurant.name}`);
              }).catch(() => {
                const destinationFile = path.join(__dirname, `${imagePath}/restaurants/${imageName}`);
                const sourceFile = path.join(__dirname, `${imagePath}/default.png`);

                fs.copyFile(sourceFile, destinationFile, (err) => {
                  if (err) throw err;
                  console.log(`Copying default image for restaurant ${restaurant.name}`);
                });
              }));

            insertPromises.push(new Restaurant({
              name: restaurant.name,
              image: imageName,
              rating: restaurant.rating,
              establishments: restaurant.establishments,
              cuisines: restaurant.cuisines,
              costForTwo: restaurant.costForTwo,
              openingHours: restaurant.openingHours,
              phone: restaurant.phone,
              location: {
                address: restaurant.address,
                locality: restaurant.locality,
                city: restaurant.city,
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              },
            }).save()
              .then((data) => {
                console.log(`Inserting restaurant ${data.name} into mongodb`);
              }).catch(() => {
                // handle error
              }));
          });

          Promise.all(insertPromises.concat(downloadPromises)).then(() => {
            console.log(`Finishing batch ${i}`);
            resolve();
          });
        });
      }).catch((err) => {
        console.log(err);
        process.exit();
      });
  }));
}

Promise.all(scrapPromises).then(() => {
  console.log('Finally completed, will terminate the scraping process');
  process.exit();
});
