import {
  deletePhotosFromS3,
  uploadPhotosToS3,
} from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { processCategories } from "../coffeeShop.utils";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: async (
      _,
      {
        id,
        name,
        latitude,
        longitude,
        newPhotos,
        photoIdsToDelete,
        categories,
        deleteShop,
      },
      { client, loggedInUser }
    ) => {
      if (deleteShop) {
        const photos = await client.coffeeShopPhoto.findMany({
          where: { shopId: id },
        });
        deletePhotosFromS3(photos, "coffeeShops");
        await client.coffeeShop.delete({ where: { id } });
        return { ok: true };
      }

      const coffeeShop = await client.coffeeShop.findUnique({
        where: { id },
        include: { photos: true, categories: true },
      });

      if (coffeeShop?.userId !== loggedInUser?.id) {
        return { ok: false, error: "You don't have permission." };
      }

      if (photoIdsToDelete) {
        const photos = await client.coffeeShopPhoto.findMany({
          where: { id: { in: photoIdsToDelete } },
        });
        deletePhotosFromS3(photos, "coffeeShops");
      }

      let urls: string[] = [];
      if (newPhotos) {
        urls = await uploadPhotosToS3(newPhotos, "coffeeShops");
      }

      await client.coffeeShop.update({
        where: { id },
        data: {
          name,
          latitude,
          longitude,
          photos: {
            ...(photoIdsToDelete && {
              delete: photoIdsToDelete.map((id: number) => ({ id })),
            }),
            ...(urls && { create: urls.map((url: string) => ({ url })) }),
          },
          ...(categories && {
            categories: {
              disconnect:
                coffeeShop?.categories.map((category) => ({
                  id: category.id,
                })) || [],
              connectOrCreate: processCategories(categories),
            },
          }),
        },
      });
      return { ok: true };
    },
  },
};

export default resolvers;
