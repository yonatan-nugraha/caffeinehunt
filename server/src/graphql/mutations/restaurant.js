const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql');

const restaurantType = require('../types/restaurant');
const Restaurant = require('../../models/restaurant');

module.exports = {
  createRestaurant: {
    type: restaurantType,
    args: {
      name: {
        name: 'name',
        type: new GraphQLNonNull(GraphQLString),
      },
      image: {
        name: 'image',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(root, args) {
      const restaurant = new Restaurant({
        name: args.name || 'Untitled name',
        image: args.image,
      });

      return restaurant.save();
    },
  },
  updateRestaurant: {
    type: restaurantType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID),
      },
      name: {
        name: 'name',
        type: new GraphQLNonNull(GraphQLString),
      },
      image: {
        name: 'image',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(root, args) {
      return Restaurant.findByIdAndUpdate(args.id, {
        name: args.name || 'Untitled name',
        image: args.image,
      });
    },
  },
  deleteRestaurant: {
    type: restaurantType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve(root, args) {
      return Restaurant.findByIdAndRemove(args.id);
    },
  },
};
