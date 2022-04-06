import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCategory: (_, { keyword, lastId }, { client }) =>
      client.coffeeShop.findMany({
        where: { categories: { some: { name: { contains: keyword } } } },
        take: 10,
        ...(lastId && { cursor: { id: lastId }, skip: 1 }),
      }),
  },
};

export default resolvers;
