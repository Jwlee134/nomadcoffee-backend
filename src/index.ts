import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import client from "./client";

const server = new ApolloServer({ typeDefs, resolvers, context: { client } });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
