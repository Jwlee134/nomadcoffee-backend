import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCategories: async (_, { lastId }, { client }) =>
      client.category.findMany({
        take: 10,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
