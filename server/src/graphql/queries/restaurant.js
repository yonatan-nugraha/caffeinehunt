const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');

const restaurantType = require('../types/restaurant');
const Restaurant = require('../../models/restaurant');

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
    args: {},
    resolve(root, args) {
      return Restaurant.find();
    },
  },
};
