const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const restaurantType = require('../types/restaurant');
const Restaurant = require('../../models/restaurant');

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
        type: new GraphQLNonNull(GraphQLString),
      },
      longitude: {
        name: 'longitude',
        type: new GraphQLNonNull(GraphQLString),
      },
      page: {
        name: 'page',
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(root, args) {
      return Restaurant.find().lean().then((restaurants) => {
        const { latitude, longitude, page } = args;
        const limit = 10;
        const start = (page - 1) * limit;

        restaurants.forEach((restaurant) => {
          const distance = calculateDistance(latitude, longitude, restaurant.latitude, restaurant.longitude, 'K');
          restaurant.distance = distance;

          return restaurant;
        });

        restaurants.sort((a, b) => a.distance - b.distance);

        return restaurants.splice(start, limit);
      }).catch((err) => {
        return [];
      });
    },
  },
};
