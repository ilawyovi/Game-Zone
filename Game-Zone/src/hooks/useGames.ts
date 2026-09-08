import type { GameQuery } from "../types/game";
import type { Platform } from "../types/platform";
import useData from "./useData";


export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
        page: gameQuery.page,
        page_size: 30,
      },
    },
    [gameQuery],
  );

export default useGames;

