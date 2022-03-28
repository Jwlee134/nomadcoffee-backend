import { Resolvers } from "../types";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers: Resolvers = {
  Query: { books: () => books },
};

export default resolvers;
