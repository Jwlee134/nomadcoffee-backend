import { uploadPhotoToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import { protectedResolver } from "../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, name, location, avatar, githubUsername, password },
        { client, loggedInUser }
      ) => {
        let avatarUrl,
          hashedPw = "";
        if (avatar) {
          avatarUrl = await uploadPhotoToS3(avatar, "avatars");
        }
        if (password) {
          hashedPw = await bcrypt.hash(password, 10);
        }
        await client.user.update({
          where: { id: loggedInUser?.id },
          data: {
            username,
            email,
            name,
            location,
            githubUsername,
            ...(avatarUrl && { avatarUrl }),
            ...(hashedPw && { password: hashedPw }),
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
