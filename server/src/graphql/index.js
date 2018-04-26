const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const mutations = require('./mutations/restaurant');
const queries = require('./queries/restaurant');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries,
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations,
  }),
});
