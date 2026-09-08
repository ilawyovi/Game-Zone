import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import type { Game } from "../hooks/useGames";

import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import Emoji from "./Emoji";
import FavoriteButton from "./FavoriteButton";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card
      height="100%"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
    >
      <Box position="relative">
        <Link
          to={`/game/${game.slug}`}
          style={{
            display: "block",
          }}
        >
          <Image
            src={getCroppedImageUrl(game.background_image)}
            width="100%"
            height="200px"
            objectFit="cover"
            borderTopRadius="md"
          />
        </Link>

        <Box
          position="absolute"
          top={2}
          right={2}
          zIndex={2}
        >
          <FavoriteButton gameId={game.id} />
        </Box>
      </Box>

      <CardBody>
        <Link
          to={`/game/${game.slug}`}
          style={{
            textDecoration: "none",
          }}
        >
          <HStack
            justifyContent="space-between"
            marginBottom={3}
          >
            <PlatformIconList
              platforms={game.parent_platforms.map(
                (p) => p.platform,
              )}
            />

            <CriticScore score={game.metacritic} />
          </HStack>

          <Heading
            fontSize="2xl"
            minHeight="64px"
            noOfLines={3}
          >
            {game.name}

            <Emoji rating={game.rating_top} />
          </Heading>
        </Link>
      </CardBody>
    </Card>
  );
};

export default GameCard;