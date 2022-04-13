import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { lastId }, { client }) =>
      client.coffeeShop.findMany({
        take: 10,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
        include: {
          photos: { take: 1 },
          user: { select: { username: true, avatarUrl: true } },
          categories: { select: { id: true, name: true } },
        },
      }),
  },
};

export default resolvers;
