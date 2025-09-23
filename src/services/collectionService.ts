import type { DataSource } from "../repositories/dataSource";
import { JsonRepository } from "../repositories/jsonRepository";
import {
  CategoryEnum,
  type CategoryStats,
  type CollectionItem,
} from "../types";

type GetItemsParams = {
  category?: CategoryEnum;
  page?: number;
  limit?: number;
};

class CollectionService {
  constructor(
    private readonly collectionRepository: DataSource<CollectionItem>
  ) {
    this.collectionRepository = collectionRepository;
  }

  getItems = ({ category, page = 1, limit = 10 }: GetItemsParams) => {
    let items = this.collectionRepository.getAll();

    if (category) {
      items = items.filter((item) => item.category === category);
    }

    const start = (page - 1) * limit;

    return items.slice(start, start + limit);
  };

  getItemById = (id: string) => {
    return this.collectionRepository.getById(id);
  };

  createItem = (item: Omit<CollectionItem, "id">) => {
    return this.collectionRepository.create(item as CollectionItem);
  };

  updateItem = (id: string, updated: Partial<Omit<CollectionItem, "id">>) => {
    return this.collectionRepository.update(id, updated as CollectionItem);
  };

  deleteItem = (id: string) => {
    return this.collectionRepository.delete(id);
  };

  getStats = () => {
    const items = this.collectionRepository.getAll();
    const totalItems = items.length;
    const averageRating = totalItems
      ? items.reduce((acc, item) => acc + (item.rating || 0), 0) / totalItems
      : 0;

    const categoryPercentages: CategoryStats[] = Object.values(
      CategoryEnum
    ).map((category) => {
      const categoryItems = items.filter((item) => item.category === category);
      const categoryTotal = categoryItems.length;
      const categoryPercentage = categoryTotal
        ? (categoryTotal / totalItems) * 100
        : 0;
      const categoryAverageRating = categoryTotal
        ? categoryItems.reduce((acc, item) => acc + (item.rating || 0), 0) /
          categoryTotal
        : 0;

      return {
        category,
        averageRating: categoryAverageRating,
        percentage: categoryPercentage,
        quantity: categoryTotal,
      };
    });

    return {
      totalItems,
      averageRating,
      categoryPercentages,
    };
  };
}

export default new CollectionService(
  new JsonRepository("data/collection.json")
);
