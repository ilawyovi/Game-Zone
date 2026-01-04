import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Genres {
    id: number;                            
    name: string;
  };
  
  interface FetchGenresResponse {
    count: number;
    results: Genres[];
  }

const useGenres = () => {
  const [Genres, setGenres] = useState<Genres[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    
    apiClient
      .get<FetchGenresResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
        })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { Genres, error, isLoading };
};

export default useGenres;