import { uploadMultiplePhotosToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/user.utils";
import { processCategories } from "../coffeeShop.utils";

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { client, loggedInUser }
      ) => {
        const urls = await uploadMultiplePhotosToS3(photos, "coffeeShops");
        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: { connect: { id: loggedInUser?.id } },
            photos: { create: urls.map((url) => ({ url })) },
            categories: { connectOrCreate: processCategories(categories) },
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
