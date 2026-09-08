import type { Genre } from "../hooks/useGenres";
import type { Platform } from "./platform";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
  page: number;
}