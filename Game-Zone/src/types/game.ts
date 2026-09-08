import type { Genre } from "../hooks/useGenres";
import type { Developer } from "./developer";
import type { Platform } from "./platform";
import type { Publisher } from "./publisher";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  developer: Developer | null;
  publisher: Publisher | null;
  sortOrder: string;
  searchText: string;
  page: number;
}