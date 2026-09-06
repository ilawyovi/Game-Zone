import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../services/api-client";
import useFavorites from "./useFavorites";
import type { Game } from "./useGames";

const useFavoriteGames = () => {
  const { favorites } = useFavorites();

  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (favorites.length === 0) {
      setGames([]);
      setError("");
      setIsLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setIsLoading(true);
      setError("");

      try {
        const responses = await Promise.all(
          favorites.map((id) =>
            apiClient.get<Game>(`/games/${id}`, {
              signal: controller.signal,
            })
          )
        );

        setGames(responses.map((response) => response.data));
      } catch (err) {
        if (err instanceof CanceledError) return;

        setError("Failed to load favorite games.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchFavorites();

    return () => controller.abort();
  }, [favorites]);

  return {
    games,
    error,
    isLoading,
  };
};

export default useFavoriteGames;
