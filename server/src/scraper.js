const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');

const Restaurant = require('./models/restaurant.js');
const mongodb = require('./mongodb');

mongodb.connect();

const scrapPromises = [];

for (let i = 1; i <= 5; i += 1) {
  const page = i > 1 ? `?page=${i}` : '';

  scrapPromises.push(new Promise((resolve, reject) => {
    axios.get(`https://www.zomato.com/jakarta/restaurants/coffee-tea${page}`)
      .then((res) => {
        const $ = cheerio.load(res.data);
        const restaurantPromises = [];

        $('.search-card').each((index, element) => {
          const name = $(element).find('.result-title').text().trim();
          const subzone = $(element).find('.search_result_subzone').text().trim();
          const address = $(element).find('.search-result-address').text().trim();
          const rating = $(element).find('.res-rating-nf').text().trim();
          const establishment = $(element).find('.res-snippet-small-establishment').find('a').text().trim();
          const costForTwo = $(element).find('.res-cost').text().trim().replace(/\D+/g, '');
          const imageUrl = $(element).find('.search_left_featured').find('a').attr('data-original').trim();
          const pageUrl = $(element).find('.result-title').attr('href').trim();

          restaurantPromises.push(axios.get(pageUrl)
            .then((response) => {
              const $ = cheerio.load(response.data);
              const latitude = $("meta[property='place:location:latitude']").attr('content');
              const longitude = $("meta[property='place:location:longitude']").attr('content');

              const restaurant = {
                name,
                rating,
                establishment,
                costForTwo,
                imageUrl,
                subzone,
                address,
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
              establishment: restaurant.establishment,
              costForTwo: restaurant.costForTwo,
              subzone: restaurant.subzone,
              address: restaurant.address,
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
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
