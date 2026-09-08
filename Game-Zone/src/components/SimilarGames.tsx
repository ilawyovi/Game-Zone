import {
  Box,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

import GameCard from "./GameCard";
import useSimilarGames from "../hooks/useSimilarGames";

interface Props {
  gameId: number;
  genreId?: number;
  platformId?: number;
}

const SimilarGames = ({
  gameId,
  genreId,
  platformId,
}: Props) => {
  const { data, isLoading } = useSimilarGames({
    genreId,
    platformId,
  });

  const games = data
    .filter((game) => game.id !== gameId)
    .slice(0, 6);

  if (!genreId && !platformId) {
    return null;
  }

  return (
    <Box width="100%">
      <Heading
        size="lg"
        marginBottom={5}
      >
        Similar Games
      </Heading>

      {isLoading ? (
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
          }}
          spacing={5}
        >
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <Stack key={index}>
                <Skeleton
                  height="200px"
                  borderRadius="md"
                />
                <Skeleton
                  height="24px"
                  width="80%"
                />
                <Skeleton
                  height="20px"
                  width="50%"
                />
              </Stack>
            ),
          )}
        </SimpleGrid>
      ) : games.length > 0 ? (
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
          }}
          spacing={5}
        >
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}
        </SimpleGrid>
      ) : null}
    </Box>
  );
};

export default SimilarGames;