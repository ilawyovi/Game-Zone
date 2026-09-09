import {
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FiHeart, FiMenu } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import ColorModeSwitch from "../common/ColorModeSwitch";
import FavoritesPanel from "../favorites/FavoritesPanel";
import useFavorites from "../../hooks/useFavorites";
import { useDisclosure } from "@chakra-ui/react";

const MobileMenu = () => {
  const {
    isOpen: isFavoritesOpen,
    onOpen: onFavoritesOpen,
    onClose: onFavoritesClose,
  } = useDisclosure();

  const { favorites } = useFavorites();

  return (
    <>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Open menu"
            icon={<FiMenu size={24} />}
            variant="outline"
            minWidth="40px"
            paddingX={0}
          />
        </PopoverTrigger>

        <PopoverContent width="220px">
          <PopoverArrow />

          <PopoverBody padding={3}>
            <Box>
              <HStack
                justifyContent="space-between"
                padding={2}
              >
                <Text fontWeight="medium">🌙 Dark Mode
                </Text>

               <ColorModeSwitch showLabel={false} />
              </HStack>

              <HStack
                justifyContent="space-between"
                padding={2}
                cursor="pointer"
                borderRadius="md"
                transition="all 0.2s"
                _hover={{
                  background: "blackAlpha.100",
                  color: "pink.400",
                }}
                onClick={onFavoritesOpen}
              >
                <HStack>
                  {favorites.length > 0 ? (
                    <FaHeart />
                  ) : (
                    <FiHeart />
                  )}

                  <Text fontWeight="medium">
                    Favorites
                  </Text>
                </HStack>

                <Text fontSize="sm" color="gray.500">
                  {favorites.length}
                </Text>
              </HStack>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <FavoritesPanel
        isOpen={isFavoritesOpen}
        onClose={onFavoritesClose}
      />
    </>
  );
};

export default MobileMenu;