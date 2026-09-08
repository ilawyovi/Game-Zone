import type { Game } from "./useGames";
import useData from "./useData";

interface SimilarGameParams {
  genreId?: number;
  platformId?: number;
}

const useSimilarGames = ({
  genreId,
  platformId,
}: SimilarGameParams) => {
  const params = {
    genres: genreId,
    platforms: platformId,
    page_size: 7,
  };

  return useData<Game>(
    "/games",
    { params },
    [genreId, platformId],
  );
};

export default useSimilarGames;