import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import useFavorites from "../hooks/useFavorites";
import useFavoriteGames from "../hooks/useFavoriteGames";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesPanel = ({ isOpen, onClose }: Props) => {
  const { toggleFavorite } = useFavorites();
  const { games, error, isLoading } = useFavoriteGames();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay backdropFilter="blur(3px)" />

      <DrawerContent
        maxWidth={{ base: "100%", sm: "420px" }}
        background="gray.50"
        _dark={{
          background: "gray.900",
        }}
      >
        <DrawerCloseButton />

        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="gray.200"
          _dark={{
            borderColor: "whiteAlpha.200",
          }}
          paddingY={5}
        >
          <HStack spacing={2}>
            <FaHeart color="#EC4899" />

            <Text fontSize="xl" fontWeight="bold">
              Favorites
            </Text>

            {games.length > 0 && (
              <Box
                paddingX={2}
                paddingY={0.5}
                borderRadius="full"
                background="pink.500"
                color="white"
                fontSize="xs"
                fontWeight="bold"
              >
                {games.length}
              </Box>
            )}
          </HStack>
        </DrawerHeader>

        <DrawerBody padding={4}>
         
          {isLoading && (
            <VStack spacing={4} align="stretch">
              {[1, 2, 3].map((item) => (
                <HStack key={item} spacing={3}>
                  <Skeleton
                    width="100px"
                    height="70px"
                    borderRadius="lg"
                    flexShrink={0}
                  />

                  <Box flex={1}>
                    <SkeletonText
                      noOfLines={2}
                      spacing={2}
                    />
                  </Box>
                </HStack>
              ))}
            </VStack>
          )}

          {/* Error */}
          {!isLoading && error && (
            <Box
              textAlign="center"
              paddingTop={12}
              paddingX={4}
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                marginBottom={2}
              >
                Something went wrong
              </Text>

              <Text color="gray.500">
                We couldn't load your favorite games.
              </Text>
            </Box>
          )}

         
          {!isLoading && !error && games.length === 0 && (
            <VStack
              textAlign="center"
              paddingTop={16}
              spacing={4}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="80px"
                height="80px"
                borderRadius="full"
                background="pink.50"
                _dark={{
                  background: "pink.900",
                }}
              >
                <FiHeart
                  size={34}
                  color="#EC4899"
                />
              </Box>

              <Box>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                >
                  No favorite games yet
                </Text>

                <Text
                  marginTop={2}
                  color="gray.500"
                  fontSize="sm"
                >
                  Add games to your favorites and
                  they will appear here.
                </Text>
              </Box>
            </VStack>
          )}

         
          {!isLoading && !error && games.length > 0 && (
            <VStack
              spacing={3}
              align="stretch"
            >
              {games.map((game, index) => (
                <HStack
                  key={game.id}
                  spacing={3}
                  align="stretch"
                  padding={2}
                  borderRadius="xl"
                  background="white"
                  _dark={{
                    background: "gray.800",
                  }}
                  boxShadow="sm"
                  transition="all 0.2s ease"
                  animation={`favorite-card-enter 0.3s ease ${index * 0.05}s both`}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                >
                
                  <Image
                    src={getCroppedImageUrl(
                      game.background_image
                    )}
                    alt={game.name}
                    width="100px"
                    height="75px"
                    objectFit="cover"
                    borderRadius="lg"
                    flexShrink={0}
                  />

                  {/* Game Info */}
                  <VStack
                    flex={1}
                    minWidth={0}
                    align="stretch"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="sm"
                      noOfLines={2}
                    >
                      {game.name}
                    </Text>

                    <HStack
                      spacing={2}
                      fontSize="xs"
                      color="gray.500"
                    >
                      <Text>
                        ⭐ {game.rating.toFixed(1)}
                      </Text>

                      <Text>
                        {game.parent_platforms?.length ?? 0}{" "}
                        platforms
                      </Text>
                    </HStack>

                    {/* Platforms */}
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      noOfLines={1}
                    >
                      {game.parent_platforms
                        ?.map(
                          ({ platform }) => platform.name
                        )
                        .join(" • ") || "Unknown platform"}
                    </Text>
                  </VStack>

                  {/* Remove */}
                  <IconButton
                    aria-label={`Remove ${game.name} from favorites`}
                    title="Remove from favorites"
                    icon={<FiTrash2 size={17} />}
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    flexShrink={0}
                    alignSelf="center"
                    transition="all 0.2s ease"
                    _hover={{
                      color: "red.400",
                      background: "red.50",
                      _dark: {
                        background: "red.900",
                      },
                      transform: "scale(1.1)",
                    }}
                    onClick={() =>
                      toggleFavorite(game.id)
                    }
                  />
                </HStack>
              ))}
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoritesPanel;