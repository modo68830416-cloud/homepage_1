import { Repository } from "@/repositories/base-repository";

export const favoriteProductsRepository = new Repository<string[]>(
  "fashion-creator:favorite-products",
  [],
);

export const favoriteCreatorsRepository = new Repository<string[]>(
  "fashion-creator:favorite-creators",
  [],
);
