import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

const GameGrid = () => {
  const { data, error, isLoading } = useGames();
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      padding="10px"
      spacing={3}
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



















// if (error) return <Text>{error}</Text>;

//   return (
//     <SimpleGrid
//       columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
//       padding="10px"
//       spacing={10}
//     >
//       {isLoading &&
//         skeletons.map((_, index) => (
//           <GameCardContainer key={index}>
//             <GameCardSkeleton />
//           </GameCardContainer>
//         ))}

//       {!isLoading &&
//         games.map((game) => (
//           <GameCardContainer key={game.id}>
//             <GameCard game={game} />
//           </GameCardContainer>
//         ))}
//     </SimpleGrid>
//   );
// };
