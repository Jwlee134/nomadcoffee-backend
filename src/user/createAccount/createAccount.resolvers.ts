import { Resolvers } from "../../types";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, password },
      { client }
    ) => {
      const emailExists = await client.user.findUnique({
        where: { email },
        select: { email: true },
      });
      if (Boolean(emailExists)) {
        return { ok: false, error: "This email is already taken." };
      }
      const usernameExists = await client.user.findUnique({
        where: { username },
        select: { username: true },
      });
      if (Boolean(usernameExists)) {
        return { ok: false, error: "This username is already taken." };
      }
      const hashedpw = await bcrypt.hash(password, 10);
      await client.user.create({
        data: { email, password: hashedpw, name, username },
      });
      return { ok: true };
    },
  },
};

export default resolvers;
