const {
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const restaurantType = require('../types/restaurant');
const Restaurant = require('../../models/restaurant');
const config = require('../../config/default');

require('../../global');

module.exports = {
  restaurant: {
    type: restaurantType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve(root, args) {
      return Restaurant.findById(args.id);
    },
  },
  restaurants: {
    type: new GraphQLList(restaurantType),
    args: {
      latitude: {
        name: 'latitude',
        type: new GraphQLNonNull(GraphQLFloat),
      },
      longitude: {
        name: 'longitude',
        type: new GraphQLNonNull(GraphQLFloat),
      },
      offset: {
        name: 'offset',
        type: new GraphQLNonNull(GraphQLInt),
      },
      limit: {
        name: 'limit',
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(root, args) {
      return Restaurant.find().lean().then((restaurants) => {
        const {
          latitude,
          longitude,
          offset,
          limit,
        } = args;

        restaurants.forEach((restaurant) => {
          const distance = calculateDistance(latitude, longitude, restaurant.location.latitude, restaurant.location.longitude, 'K');
          restaurant.distance = distance;
          restaurant.image = `${config.app.url}/images/restaurants/${restaurant.image}`;

          return restaurant;
        });

        restaurants.sort((a, b) => a.distance - b.distance);

        return restaurants.splice(offset, limit);
      }).catch((err) => {
        console.log(err);
        return [];
      });
    },
  },
};
