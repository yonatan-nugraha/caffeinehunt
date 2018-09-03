const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} = require('graphql');

const locationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    address: {
      type: GraphQLString,
    },
    locality: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    latitude: {
      type: GraphQLFloat,
    },
    longitude: {
      type: GraphQLFloat,
    },
  },
});

module.exports = new GraphQLObjectType({
  name: 'Restaurant',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
    rating: {
      type: GraphQLFloat,
    },
    establishments: {
      type: GraphQLString,
    },
    cuisines: {
      type: GraphQLString,
    },
    costForTwo: {
      type: GraphQLInt,
    },
    openingHours: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    location: {
      type: locationType,
    },
  },
});
