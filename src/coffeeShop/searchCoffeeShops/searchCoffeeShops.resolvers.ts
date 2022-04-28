import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShops: (_, { lastId, keyword }, { client }) =>
      client.coffeeShop.findMany({
        take: 5,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
        ...(keyword && {
          where: {
            OR: [
              { categories: { some: { name: keyword } } },
              { name: { startsWith: keyword, mode: "insensitive" } },
            ],
          },
        }),
        include: {
          photos: true,
          user: { select: { username: true, avatarUrl: true } },
          categories: { select: { id: true, name: true } },
        },
      }),
  },
};

export default resolvers;
