import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { getLoggedInUser } from "./user/user.utils";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      loggedInUser: await getLoggedInUser(req.headers.token),
      client,
    }),
  });
  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
