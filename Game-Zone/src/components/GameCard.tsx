import type { Game } from "../hooks/useGames";
import { Card, CardBody, Heading, HStack, Image, Box } from "@chakra-ui/react";
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
    <Card height="100%">
      <Box position="relative">
        <Image src={getCroppedImageUrl(game.background_image)} />

        <Box position="absolute" top={2} right={2}>
          <FavoriteButton gameId={game.id} />
        </Box>
      </Box>
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />

          <CriticScore score={game.metacritic} />
        </HStack>

        <Heading fontSize="2xl" minHeight="64px" noOfLines={3}>
          {game.name}
          <Emoji rating={game.rating_top} />
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
