import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";

import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import MobileGenreSelector from "./components/MobileGenreSelector";
import SidebarRecommendations from "./components/SidebarRecommendations";
import ResetFilters from "./components/ResetFilters";
import Pagination from "./components/Pagination";
import MobileFilters from "./components/MobileFilters";

import type { Genre } from "./hooks/useGenres";
import type { Platform } from "./hooks/useGames";
import useGames from "./hooks/useGames";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
  page: number;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genre: null,
    platform: null,
    sortOrder: "",
    searchText: "",
    page: 1,
  });

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

  const handleSortChange = (sortOrder: string) => {
    updateQuery({
      sortOrder,
      page: 1,
    });
  };

  const handleReset = () => {
    setGameQuery({
      genre: null,
      platform: null,
      sortOrder: "",
      searchText: "",
      page: 1,
    });
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

          <Box display={{ base: "block", md: "none" }}>
            <MobileFilters
              selectedGenre={gameQuery.genre}
              selectedPlatform={gameQuery.platform}
              sortOrder={gameQuery.sortOrder}
              onSelectGenre={handleGenreChange}
              onSelectPlatform={handlePlatformChange}
              onSelectSortOrder={handleSortChange}
              onReset={handleReset}
            />
          </Box>

          <Flex display={{ base: "none", md: "flex" }} marginBottom={5} gap={3}>
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
              onSelectPlatform={handlePlatformChange}
            />

            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={handleSortChange}
            />

            <ResetFilters onReset={handleReset} />
          </Flex>
        </Box>

        <GameGrid data={data} error={error} isLoading={isLoading} />

        <Pagination
          currentPage={gameQuery.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
