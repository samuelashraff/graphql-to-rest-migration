import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { graphqlHTTP } from "koa-graphql";
import Router from "koa-router";

export const gqlRouter = new Router();

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});

gqlRouter.all(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);




