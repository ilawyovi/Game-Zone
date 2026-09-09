import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import type { Game } from "../../hooks/useGames";

import PlatformIconList from "./PlatformIconList";
import CriticScore from "../ui/CriticScore";
import getCroppedImageUrl from "../../services/image-url";
import FavoriteButton from "../favorites/FavoriteButton";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card
      height="100%"
      display="flex"
      flexDirection="column"
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
            aspectRatio={16 / 9}
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

      <CardBody
        display="flex"
        flexDirection="column"
        flex="1"
        padding={{
          base: 3,
          md: 4,
        }}
      >
        <Link
          to={`/game/${game.slug}`}
          style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <HStack
            justifyContent="space-between"
            alignItems="center"
            marginBottom={3}
            width="100%"
          >
            <Box
              flex="1"
              minWidth={0}
              overflow="hidden"
            >
              <PlatformIconList
                platforms={game.parent_platforms.map(
                  (p) => p.platform,
                )}
              />
            </Box>

            <HStack
              spacing={2}
              flexShrink={0}
              marginLeft={2}
            >
              {game.rating > 0 && (
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color="gray.600"
                >
                  {game.rating.toFixed(1)}
                </Text>
              )}

              <CriticScore
                score={game.metacritic}
              />
            </HStack>
          </HStack>

          <Heading
            fontSize={{
              base: "lg",
              sm: "xl",
              md: "2xl",
            }}
            lineHeight="1.3"
            minWidth={0}
            fontWeight="700"
          >
            {game.name}
          </Heading>

          <Box
            marginTop="auto"
            paddingTop={4}
          >
            <HStack
              spacing={2}
              color="gray.500"
              fontSize="sm"
              flexWrap="wrap"
            >
              {game.released && (
                <Text>
                  {new Date(
                    game.released,
                  ).getFullYear()}
                </Text>
              )}

              {game.released &&
                game.genres?.length > 0 && (
                  <Text>•</Text>
                )}

              {game.genres?.length > 0 && (
                <Text noOfLines={1}>
                  {game.genres[0].name}
                </Text>
              )}
            </HStack>
          </Box>
        </Link>
      </CardBody>
    </Card>
  );
};

export default GameCard;