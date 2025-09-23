export enum CategoryEnum {
  Book = "Book",
  Movie = "Movie",
  Game = "Game",
  Serie = "Serie",
  Album = "Album",
}

export interface CollectionItem {
  id: string;
  title: string;
  author: string;
  category: CategoryEnum;
  description?: string;
  imageUrl?: string;
  rating?: number;

  createdAt: string;
  updatedAt: string;
}

export interface CategoryStats {
  category: CategoryEnum;
  quantity: number;
  percentage: number;
  averageRating: number | null;
}

export interface CollectionStats {
  totalItems: number;
  averageRating: number | null;
  categoryPercentages: CategoryStats[];
}

export interface UserProfile {
  id: string
  name: string;
  bio: string;
  avatarUrl: string;
  totalItems: number;
  averageRating: number | null;
  startYear: number;
  categorySummary: Record<CategoryEnum, number>;
}
