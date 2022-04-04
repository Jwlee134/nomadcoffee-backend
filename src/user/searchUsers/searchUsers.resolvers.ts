import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastKeyword }, { client }) =>
      client.user.findMany({
        take: 10,
        ...(lastKeyword && { skip: 1, cursor: { username: lastKeyword } }),
        where: { username: { contains: keyword.toLowerCase() } },
      }),
  },
};

export default resolvers;
