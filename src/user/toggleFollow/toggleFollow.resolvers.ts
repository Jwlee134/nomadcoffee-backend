import { Resolvers } from "../../types";
import { protectedResolver } from "../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleFollow: protectedResolver(
      async (_, { id, follow }, { client, loggedInUser }) => {
        const targetUser = await client.user.findUnique({ where: { id } });
        if (!targetUser) {
          return { ok: false, error: "User doesn't exist." };
        }
        if (follow) {
          await client.user.update({
            where: { id },
            data: { followers: { connect: { id: loggedInUser?.id } } },
          });
        } else {
          await client.user.update({
            where: { id },
            data: { followers: { disconnect: { id: loggedInUser?.id } } },
          });
        }
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
