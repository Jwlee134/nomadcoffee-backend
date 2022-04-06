import { CoffeeShopPhoto } from "@prisma/client";
import { deletePhotoFromS3, uploadPhotoToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { processCategories } from "../coffeeShop.utils";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: async (
      _,
      { id, name, latitude, longitude, newPhoto, photoIdToDelete, categories },
      { client, loggedInUser }
    ) => {
      const coffeeShop = await client.coffeeShop.findUnique({
        where: { id },
        include: { photos: true, categories: true },
      });
      if (coffeeShop?.userId !== loggedInUser?.id) {
        return { ok: false, error: "You don't have permission." };
      }
      let idToDelete: number | null = null;
      if (photoIdToDelete) {
        const photo = (await client.coffeeShopPhoto.findUnique({
          where: { id: photoIdToDelete },
        })) as CoffeeShopPhoto;
        idToDelete = photo.id;
        deletePhotoFromS3(photo, "coffeeShops");
      }
      let createUrl: string | null = null;
      if (newPhoto) {
        const url = await uploadPhotoToS3(newPhoto, "coffeeShops");
        createUrl = url;
      }
      await client.coffeeShop.update({
        where: { id },
        data: {
          name,
          latitude,
          longitude,
          photos: {
            ...(idToDelete && { delete: { id: idToDelete } }),
            ...(createUrl && { create: { url: createUrl } }),
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
