import { Resolvers } from "../../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return { ok: false, error: "User doesn't exist." };
      }
      const isCorrectPw = await bcrypt.compare(password, user.password);
      if (!isCorrectPw) {
        return { ok: false, error: "Password is incorrect." };
      }
      const token = jwt.sign(user.id + "", process.env.SECRET_KEY!);
      return { ok: true, token };
    },
  },
};

export default resolvers;
