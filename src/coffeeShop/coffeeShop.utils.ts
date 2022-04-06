export const processCategories = (categories: string[]) => {
  return (
    categories?.map((category: string) => ({
      where: { name: category },
      create: { name: category },
    })) || []
  );
};
