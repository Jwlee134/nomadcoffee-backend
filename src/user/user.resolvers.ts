import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    followers: ({ id }, { lastId }, { client }) =>
      client.user.findUnique({ where: { id } }).followers({
        take: 10,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      }),
    following: ({ id }, { lastId }, { client }) =>
      client.user.findUnique({ where: { id } }).following({
        take: 10,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
