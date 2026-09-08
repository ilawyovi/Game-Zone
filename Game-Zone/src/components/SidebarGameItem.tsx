import {
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import type { Game } from "../hooks/useGames";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  game: Game;
}

const SidebarGameItem = ({ game }: Props) => {
  return (
    <Link
      to={`/game/${game.slug}`}
      style={{
        display: "block",
        textDecoration: "none",
      }}
    >
      <HStack
        spacing={3}
        width="100%"
        transition="all 0.2s"
        _hover={{
          transform: "translateX(4px)",
        }}
      >
        <Image
          src={getCroppedImageUrl(
            game.background_image,
          )}
          alt={game.name}
          boxSize="40px"
          borderRadius="6px"
          objectFit="cover"
          flexShrink={0}
        />

        <Text
          fontSize="sm"
          fontWeight="medium"
          noOfLines={2}
          transition="color 0.2s"
          _hover={{
            color: "orange.400",
          }}
        >
          {game.name}
        </Text>
      </HStack>
    </Link>
  );
};

export default SidebarGameItem;