import { useEffect, useState } from "react";
import { CanceledError } from "axios";

import apiClient from "../services/api-client";

export interface GameDetails {
  id: number;
  slug: string;
  name: string;
  description: string;
  description_raw: string;
  background_image: string;
  background_image_additional: string | null;

  released: string | null;

  rating: number;
  rating_top: number;
  ratings_count: number;

  metacritic: number | null;

  playtime: number;

  website: string;

  updated: string;

  genres: {
    id: number;
    name: string;
    slug: string;
  }[];

  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
    released_at: string | null;
    requirements: {
      minimum?: string;
      recommended?: string;
    } | null;
  }[];

  developers: {
    id: number;
    name: string;
    slug: string;
  }[];

  publishers: {
    id: number;
    name: string;
    slug: string;
  }[];

  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  } | null;

  stores: {
    id: number;
    url: string;
    store: {
      id: number;
      name: string;
      slug: string;
    };
  }[];

  short_screenshots: {
    id: number;
    image: string;
  }[];
  
  movies: {
    id: number;
    name: string;
    preview: string;
    data: {
      480?: string;
      max?: string;
    };
  }[];

  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
}

const useGameDetails = (slug: string | undefined) => {
  const [data, setData] = useState<GameDetails | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    setLoading(true);
    setError("");
    setData(null);

    apiClient
      .get<GameDetails>(`/games/${slug}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;

        setError(
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to load game details.",
        );

        setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useGameDetails;