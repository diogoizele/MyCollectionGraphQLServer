import { CategoryEnum } from "../types";

export const categoryMapping: Record<string, CategoryEnum> = {
  Book: CategoryEnum.Book,
  Movie: CategoryEnum.Movie,
  Game: CategoryEnum.Game,
  Serie: CategoryEnum.Serie,
  Album: CategoryEnum.Album,
};
