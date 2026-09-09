import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import type { Game } from "../../hooks/useGames";

interface Props {
  data: Game[];
  error: string;
  isLoading: boolean;
}

const GameGrid = ({ data, error, isLoading }: Props) => {
  const skeletons = Array.from(
    { length: 30 },
    (_, index) => index + 1,
  );

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ base: 2, md: 2, lg: 3, xl: 5 }}
      padding="10px"
      spacing={6}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}

      {!isLoading &&
        data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
    </SimpleGrid>
  );
};

export default GameGrid;

