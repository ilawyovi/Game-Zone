import { IconButton } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import useFavorites from "../hooks/useFavorites";

interface Props {
  gameId: number;
}

const FavoriteButton = ({ gameId }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(gameId);

  return (
    <IconButton
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      title={favorite ? "Remove from favorites" : "Add to favorites"}
      icon={favorite ? <FaHeart size={21} /> : <FiHeart size={23} />}
      variant="ghost"
      color={favorite ? "pink.400" : "white"}
      background="blackAlpha.500"
      borderRadius="full"
      backdropFilter="blur(6px)"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.25)"
      transition="all 0.2s ease"
      _hover={{
        background: "blackAlpha.700",
        color: "pink.400",
        transform: "scale(1.18)",
        boxShadow: "0 0 18px rgba(236, 72, 153, 0.8)",
      }}
      _active={{
        transform: "scale(0.92)",
      }}
      onClick={() => toggleFavorite(gameId)}
    />
  );
};

export default FavoriteButton;
