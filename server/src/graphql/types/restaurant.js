const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

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
  },
});
