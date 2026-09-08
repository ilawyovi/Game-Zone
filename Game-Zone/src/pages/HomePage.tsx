import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";

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
  const [gameQuery, setGameQuery] = useState<GameQuery>(initialQuery);

  const { data, count, error, isLoading } = useGames(gameQuery);

  const totalPages = Math.ceil(count / 30);

  const updateQuery = (changes: Partial<GameQuery>) => {
    setGameQuery((currentQuery) => ({
      ...currentQuery,
      ...changes,
    }));
  };

  const handlePageChange = (page: number) => {
    updateQuery({ page });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (searchText: string) => {
    updateQuery({
      searchText,
      page: 1,
    });

    onSearch(searchText);
  };

  const handleGenreChange = (genre: Genre) => {
    updateQuery({
      genre,
      page: 1,
    });
  };

  const handlePlatformChange = (platform: Platform) => {
    updateQuery({
      platform,
      page: 1,
    });
  };

  const handleDeveloperChange = (developer: Developer) => {
    updateQuery({
      developer,
      page: 1,
    });
  };

  const handlePublisherChange = (publisher: Publisher) => {
    updateQuery({
      publisher,
      page: 1,
    });
  };

  const handleSortChange = (sortOrder: string) => {
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

      {/* Desktop Sidebar */}
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={handleGenreChange}
          />

          <SidebarRecommendations />
        </GridItem>
      </Show>

      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />

          {/* Tablet + Mobile */}
          <Box display={{ base: "block", lg: "none" }}>
            <MobileFilters
              selectedGenre={gameQuery.genre}
              selectedPlatform={gameQuery.platform}
              selectedDeveloper={gameQuery.developer}
              selectedPublisher={gameQuery.publisher}
              sortOrder={gameQuery.sortOrder}
              onSelectGenre={handleGenreChange}
              onSelectPlatform={handlePlatformChange}
              onSelectDeveloper={handleDeveloperChange}
              onSelectPublisher={handlePublisherChange}
              onSelectSortOrder={handleSortChange}
              onReset={handleReset}
            />
          </Box>

          {/* Desktop Filters */}
          <Flex
            display={{ base: "none", lg: "flex" }}
            marginBottom={5}
            gap={3}
            flexWrap="wrap"
          >
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
              onSelectPlatform={handlePlatformChange}
            />

            <DeveloperSelector
              selectedDeveloper={gameQuery.developer}
              onSelectDeveloper={handleDeveloperChange}
            />

            <PublisherSelector
              selectedPublisher={gameQuery.publisher}
              onSelectPublisher={handlePublisherChange}
            />

            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={handleSortChange}
            />

            <ResetFilters onReset={handleReset} />
          </Flex>
        </Box>

        <GameGrid
          data={data}
          error={error}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={gameQuery.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </GridItem>
    </Grid>
  );
}

export default HomePage;