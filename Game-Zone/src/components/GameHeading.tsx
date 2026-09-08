import { Heading } from "@chakra-ui/react";
import type { GameQuery } from "../types/game";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const filters = [
    gameQuery.genre?.name,
    gameQuery.platform?.name,
    gameQuery.developer?.name,
    gameQuery.publisher?.name,
  ].filter(Boolean);

  const heading =
    filters.length > 0
      ? `${filters.join(" • ")} Games`
      : "Games";

  return (
    <Heading
      as="h1"
      marginY={5}
      fontSize="5xl"
    >
      {heading}
    </Heading>
  );
};

export default GameHeading;