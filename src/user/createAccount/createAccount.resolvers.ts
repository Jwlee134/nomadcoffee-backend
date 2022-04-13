import { Resolvers } from "../../types";
import jwt from "jsonwebtoken";
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
      const user = await client.user.create({
        data: {
          email,
          password: hashedpw,
          name,
          username,
          avatarUrl:
            "https://nomadcoffee-jw.s3.ap-northeast-2.amazonaws.com/avatars/1646290008674-Jwlee134-avatar.jpeg",
        },
      });
      const token = jwt.sign(user.id + "", process.env.SECRET_KEY!);
      return { ok: true, token };
    },
  },
};

export default resolvers;
