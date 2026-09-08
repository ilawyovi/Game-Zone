import {
  Box,
  Flex,
  Grid,
  GridItem,
  Show,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import NavBar from "../components/NavBar";
import GameGrid from "../components/GameGrid";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import DeveloperSelector from "../components/DeveloperSelector";
import PublisherSelector from "../components/PublisherSelector";
import SortSelector from "../components/SortSelector";
import GameHeading from "../components/GameHeading";
import SidebarRecommendations from "../components/SidebarRecommendations";
import ResetFilters from "../components/ResetFilters";
import Pagination from "../components/Pagination";
import MobileFilters from "../components/MobileFilters";

import useGames from "../hooks/useGames";
import type { Genre } from "../hooks/useGenres";
import type { Platform } from "../types/platform";
import type { Developer } from "../types/developer";
import type { Publisher } from "../types/publisher";
import type { GameQuery } from "../types/game";

interface Props {
  onSearch: (searchText: string) => void;
}

const initialQuery: GameQuery = {
  genre: null,
  platform: null,
  developer: null,
  publisher: null,
  sortOrder: "",
  searchText: "",
  page: 1,
};

function HomePage({ onSearch }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const createInitialQuery = (): GameQuery => {
    const params = new URLSearchParams(
      location.search,
    );

    const genreId = Number(
      params.get("genre"),
    );

    const platformId = Number(
      params.get("platform"),
    );

    const developerId = Number(
      params.get("developer"),
    );

    const publisherId = Number(
      params.get("publisher"),
    );

    return {
      ...initialQuery,
      genre:
        genreId > 0
          ? {
              id: genreId,
              name:
                params.get("genreName") ||
                "Genre",
              image_background: "",
            }
          : null,
      platform:
        platformId > 0
          ? {
              id: platformId,
              name:
                params.get("platformName") ||
                "Platform",
              slug:
                params.get("platformName") || "",
            }
          : null,
      developer:
        developerId > 0
          ? {
              id: developerId,
              name:
                params.get("developerName") ||
                "Developer",
              slug:
                params.get("developerName") || "",
            }
          : null,
      publisher:
        publisherId > 0
          ? {
              id: publisherId,
              name:
                params.get("publisherName") ||
                "Publisher",
              slug:
                params.get("publisherName") || "",
            }
          : null,
    };
  };

  const [gameQuery, setGameQuery] =
    useState<GameQuery>(
      createInitialQuery,
    );

  const { data, count, error, isLoading } =
    useGames(gameQuery);

  const totalPages = Math.ceil(
    count / 30,
  );

  const updateQuery = (
    changes: Partial<GameQuery>,
  ) => {
    setGameQuery((currentQuery) => ({
      ...currentQuery,
      ...changes,
    }));
  };

  const updateUrl = (
    type:
      | "genre"
      | "platform"
      | "developer"
      | "publisher",
    id: number,
    name: string,
  ) => {
    const params = new URLSearchParams(
      location.search,
    );

    params.delete("genre");
    params.delete("genreName");
    params.delete("platform");
    params.delete("platformName");
    params.delete("developer");
    params.delete("developerName");
    params.delete("publisher");
    params.delete("publisherName");

    params.set(type, String(id));
    params.set(`${type}Name`, name);

    params.delete("page");

    navigate({
      pathname: "/",
      search: `?${params.toString()}`,
    });
  };

  const handlePageChange = (
    page: number,
  ) => {
    updateQuery({ page });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (
    searchText: string,
  ) => {
    updateQuery({
      searchText,
      page: 1,
    });

    onSearch(searchText);
  };

  const handleGenreChange = (
    genre: Genre,
  ) => {
    updateQuery({
      genre,
      platform: null,
      developer: null,
      publisher: null,
      page: 1,
    });

    updateUrl(
      "genre",
      genre.id,
      genre.name,
    );
  };

  const handlePlatformChange = (
    platform: Platform,
  ) => {
    updateQuery({
      platform,
      genre: null,
      developer: null,
      publisher: null,
      page: 1,
    });

    updateUrl(
      "platform",
      platform.id,
      platform.name,
    );
  };

  const handleDeveloperChange = (
    developer: Developer,
  ) => {
    updateQuery({
      developer,
      genre: null,
      platform: null,
      publisher: null,
      page: 1,
    });

    updateUrl(
      "developer",
      developer.id,
      developer.name,
    );
  };

  const handlePublisherChange = (
    publisher: Publisher,
  ) => {
    updateQuery({
      publisher,
      genre: null,
      platform: null,
      developer: null,
      page: 1,
    });

    updateUrl(
      "publisher",
      publisher.id,
      publisher.name,
    );
  };

  const handleSortChange = (
    sortOrder: string,
  ) => {
    updateQuery({
      sortOrder,
      page: 1,
    });
  };

  const handleReset = () => {
    setGameQuery({
      ...initialQuery,
      searchText: "",
    });

    onSearch("");

    navigate("/");
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={handleSearch} />
      </GridItem>

      <Show above="lg">
        <GridItem
          area="aside"
          paddingX={5}
        >
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={
              handleGenreChange
            }
          />

          <SidebarRecommendations />
        </GridItem>
      </Show>

      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading
            gameQuery={gameQuery}
          />

          <Box
            display={{
              base: "block",
              lg: "none",
            }}
          >
            <MobileFilters
              selectedGenre={
                gameQuery.genre
              }
              selectedPlatform={
                gameQuery.platform
              }
              selectedDeveloper={
                gameQuery.developer
              }
              selectedPublisher={
                gameQuery.publisher
              }
              sortOrder={
                gameQuery.sortOrder
              }
              onSelectGenre={
                handleGenreChange
              }
              onSelectPlatform={
                handlePlatformChange
              }
              onSelectDeveloper={
                handleDeveloperChange
              }
              onSelectPublisher={
                handlePublisherChange
              }
              onSelectSortOrder={
                handleSortChange
              }
              onReset={handleReset}
            />
          </Box>

          <Flex
            display={{
              base: "none",
              lg: "flex",
            }}
            marginBottom={5}
            gap={3}
            flexWrap="wrap"
          >
            <PlatformSelector
              selectedPlatform={
                gameQuery.platform
              }
              onSelectPlatform={
                handlePlatformChange
              }
            />

            <DeveloperSelector
              selectedDeveloper={
                gameQuery.developer
              }
              onSelectDeveloper={
                handleDeveloperChange
              }
            />

            <PublisherSelector
              selectedPublisher={
                gameQuery.publisher
              }
              onSelectPublisher={
                handlePublisherChange
              }
            />

            <SortSelector
              sortOrder={
                gameQuery.sortOrder
              }
              onSelectSortOrder={
                handleSortChange
              }
            />

            <ResetFilters
              onReset={handleReset}
            />
          </Flex>
        </Box>

        <GameGrid
          data={data}
          error={error}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={
            gameQuery.page
          }
          totalPages={totalPages}
          onPageChange={
            handlePageChange
          }
        />
      </GridItem>
    </Grid>
  );
}

export default HomePage;