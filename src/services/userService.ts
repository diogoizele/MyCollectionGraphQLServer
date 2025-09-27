import type { DataSource } from "../repositories/dataSource";
import { JsonRepository } from "../repositories/jsonRepository";
import {
  type UserProfile,
  type CollectionStats,
  type CategoryEnum,
} from "../types";
import { categoryMapping } from "../utils/categoryMapper";

import CollectionService from "./collectionService";

class UserService {
  constructor(private readonly userRepository: DataSource<UserProfile>) {}

  getUser = () => {
    const users = this.userRepository.getAll();
    return users[0] || null;
  };

  updateUser = (updated: Partial<Omit<UserProfile, "id">>) => {
    const user = this.getUser();
    if (!user) return null;

    return this.userRepository.update(user.id, { ...user, ...updated });
  };

  getCollectionSummary = (): CollectionStats => {
    return CollectionService.getStats();
  };

  getProfile = () => {
    const user = this.getUser();
    const collectionSummary = this.getCollectionSummary();

    if (!user) return null;

    console.log({
      ...user,
      totalItems: collectionSummary.totalItems,
      averageRating: collectionSummary.averageRating,
      categorySummary: collectionSummary.categoryPercentages.map((item) => ({
        category: categoryMapping[item.category],
        itemCount: item.quantity,
      })),
    });

    return {
      ...user,
      totalItems: collectionSummary.totalItems,
      averageRating: collectionSummary.averageRating,
      categorySummary: collectionSummary.categoryPercentages.map((item) => ({
        category: categoryMapping[item.category],
        itemCount: item.quantity,
      })),
    };
  };
}

export default new UserService(
  new JsonRepository<UserProfile>("data/user.json")
);
