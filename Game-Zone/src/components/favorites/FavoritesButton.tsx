import { IconButton, useDisclosure } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import useFavorites from "../../hooks/useFavorites";
import FavoritesPanel from "./FavoritesPanel";

const FavoritesButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favorites } = useFavorites();

  return (
    <>
      <IconButton
        aria-label="Favorites"
        title="Favorites"
        icon={
          favorites.length > 0 ? (
            <FaHeart size={20} />
          ) : (
            <FiHeart size={23} />
          )
        }
        variant="outline"
        minWidth="40px"
        paddingX={0}
        color={favorites.length > 0 ? "pink.400" : "inherit"}
        transition="all 0.2s ease"
        _hover={{
          color: "pink.400",
          transform: "scale(1.08)",
          borderColor: "pink.400",
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        onClick={onOpen}
      />

      <FavoritesPanel
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default FavoritesButton;