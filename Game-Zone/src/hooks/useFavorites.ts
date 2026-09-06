import { useEffect, useState } from "react";

const STORAGE_KEY = "game-zone-favorites";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId: number) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(gameId)
        ? currentFavorites.filter((id) => id !== gameId)
        : [...currentFavorites, gameId]
    );
  };

  const isFavorite = (gameId: number) => favorites.includes(gameId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};

export default useFavorites;