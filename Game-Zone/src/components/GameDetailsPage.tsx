import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useParams } from "react-router-dom";

import useGameDetails from "../hooks/useGameDetails";
import GameTrailer from "../components/GameTrailer";
import GameDescription from "../components/GameDescription";
import ScreenshotGallery from "../components/ScreenshotGallery";
import GameDetailsSkeleton from "../components/GameDetailsSkeleton";
import FavoriteButton from "../components/FavoriteButton";

function GameDetailsPage() {
  const { slug } = useParams();
  const { data: game, error, isLoading } = useGameDetails(slug);

  if (isLoading) return <GameDetailsSkeleton />;

  if (error) {
    return (
      <Box padding={{ base: 4, md: 6, lg: 8 }}>
        <VStack
          minHeight="60vh"
          justifyContent="center"
          textAlign="center"
          spacing={4}
        >
          <Heading size="lg">Something went wrong</Heading>
          <Text color="gray.500">{error}</Text>
          <Button as={RouterLink} to="/" leftIcon={<ArrowBackIcon />}>
            Back to Games
          </Button>
        </VStack>
      </Box>
    );
  }

  if (!game) return null;

  const releaseDate = game.released
    ? new Date(game.released).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const developers = game.developers
    .map((developer) => developer.name)
    .join(", ");

  const publishers = game.publishers
    .map((publisher) => publisher.name)
    .join(", ");

  const platforms = game.platforms
    .map((platform) => platform.platform.name)
    .join(", ");

  return (
    <Box>
      <Box
        position="relative"
        minHeight={{ base: "420px", md: "520px", lg: "620px" }}
        overflow="hidden"
      >
        <Image
          src={game.background_image_additional || game.background_image}
          alt={game.name}
          position="absolute"
          inset={0}
          width="100%"
          height="100%"
          objectFit="cover"
        />

        <Box
          position="absolute"
          inset={0}
          background="linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45), rgba(0,0,0,0.95))"
        />

        <Box
          position="relative"
          minHeight={{ base: "420px", md: "520px", lg: "620px" }}
          display="flex"
          alignItems="flex-end"
          padding={{ base: 5, md: 8, lg: 12 }}
        >
          <Box
            width="100%"
            maxWidth="1200px"
            margin="0 auto"
            position="relative"
          >
            <Button
              as={RouterLink}
              to="/"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.500"
              _hover={{ background: "whiteAlpha.200" }}
              leftIcon={<ArrowBackIcon />}
              marginBottom={6}
            >
              Back to Games
            </Button>

            <Box position="absolute" top={0} right={{ base: 0, md: 2 }}>
              <FavoriteButton gameId={game.id} />
            </Box>

            <Heading
              color="white"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              lineHeight="1.05"
              maxWidth="900px"
              paddingRight={{ base: "55px", md: 0 }}
            >
              {game.name}
            </Heading>

            <HStack marginTop={5} spacing={3} flexWrap="wrap">
              {game.metacritic !== null && (
                <Badge
                  colorScheme={
                    game.metacritic >= 75
                      ? "green"
                      : game.metacritic >= 50
                        ? "yellow"
                        : "red"
                  }
                  fontSize="md"
                  paddingX={3}
                  paddingY={1}
                  borderRadius="md"
                >
                  Metacritic {game.metacritic}
                </Badge>
              )}

              <Badge
                colorScheme="purple"
                fontSize="md"
                paddingX={3}
                paddingY={1}
                borderRadius="md"
              >
                ⭐ {game.rating.toFixed(1)}
              </Badge>

              <Badge
                colorScheme="blue"
                fontSize="md"
                paddingX={3}
                paddingY={1}
                borderRadius="md"
              >
                {game.ratings_count.toLocaleString()} ratings
              </Badge>
            </HStack>
          </Box>
        </Box>
      </Box>

      <Box
        maxWidth="1200px"
        margin="0 auto"
        padding={{ base: 5, md: 8, lg: 10 }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          gap={{ base: 8, lg: 12 }}
        >
          <Box>
            <Heading size="lg" marginBottom={4}>
              About {game.name}
            </Heading>

            <GameDescription description={game.description} />

            <Divider marginY={8} />

            <Heading size="lg" marginBottom={5}>
              Game Information
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <InfoItem label="Release Date" value={releaseDate} />
              <InfoItem label="Developer" value={developers || "Unknown"} />
              <InfoItem label="Publisher" value={publishers || "Unknown"} />
              <InfoItem label="Platforms" value={platforms || "Unknown"} />
              <InfoItem
                label="Playtime"
                value={game.playtime ? `${game.playtime} hours` : "Unknown"}
              />
              <InfoItem
                label="ESRB"
                value={game.esrb_rating?.name || "Not Rated"}
              />
            </SimpleGrid>

            {game.short_screenshots.length > 0 && (
              <>
                <Divider marginY={8} />

                <Heading size="lg" marginBottom={5}>
                  Screenshots
                </Heading>

                <ScreenshotGallery screenshots={game.short_screenshots} />
              </>
            )}

            {game.movies.length > 0 && (
              <>
                <Divider marginY={8} />

                <Heading size="lg" marginBottom={5}>
                  Trailer
                </Heading>

                <GameTrailer movie={game.movies[0]} />
              </>
            )}

            {game.genres.length > 0 && (
              <>
                <Divider marginY={8} />

                <Heading size="lg" marginBottom={4}>
                  Genres
                </Heading>

                <HStack spacing={3} flexWrap="wrap">
                  {game.genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      paddingX={3}
                      paddingY={2}
                      borderRadius="md"
                      fontSize="sm"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </HStack>
              </>
            )}
          </Box>

          <Box>
            <Stack spacing={5}>
              {game.website && (
                <Button
                  as={Link}
                  href={game.website}
                  isExternal
                  width="100%"
                  size="lg"
                  rightIcon={<ExternalLinkIcon />}
                >
                  Official Website
                </Button>
              )}

              <Box borderWidth="1px" borderRadius="xl" padding={6}>
                <Heading size="md" marginBottom={5}>
                  Ratings
                </Heading>

                <Stack spacing={5}>
                  <RatingItem
                    label="RAWG Rating"
                    value={`${game.rating.toFixed(1)} / 5`}
                  />

                  <RatingItem
                    label="Ratings Count"
                    value={game.ratings_count.toLocaleString()}
                  />

                  <RatingItem
                    label="Metacritic"
                    value={
                      game.metacritic !== null
                        ? `${game.metacritic} / 100`
                        : "N/A"
                    }
                  />
                </Stack>
              </Box>

              {game.stores.length > 0 && (
                <Box borderWidth="1px" borderRadius="xl" padding={6}>
                  <Heading size="md" marginBottom={5}>
                    Where to Play
                  </Heading>

                  <Stack spacing={3}>
                    {game.stores.map((item) => (
                      <Button
                        key={item.id}
                        as={Link}
                        href={item.url}
                        isExternal
                        variant="outline"
                        justifyContent="space-between"
                        rightIcon={<ExternalLinkIcon />}
                      >
                        {item.store.name}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Box>
      <Text fontSize="sm" color="gray.500" marginBottom={1}>
        {label}
      </Text>
      <Text fontWeight="600">{value}</Text>
    </Box>
  );
}

interface RatingItemProps {
  label: string;
  value: string;
}

function RatingItem({ label, value }: RatingItemProps) {
  return (
    <HStack justifyContent="space-between">
      <Text color="gray.500">{label}</Text>
      <Text fontWeight="700">{value}</Text>
    </HStack>
  );
}

export default GameDetailsPage;
