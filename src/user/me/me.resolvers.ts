import { Resolvers } from "../../types";

export default {
  Query: {
    me: (root, args, { loggedInUser }) => loggedInUser,
  },
} as Resolvers;
