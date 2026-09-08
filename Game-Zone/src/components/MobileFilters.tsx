import { useState } from "react";
import { Box, Button, Collapse, Flex } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import MobileGenreSelector from "./MobileGenreSelector";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";
import ResetFilters from "./ResetFilters";

import type { Genre } from "../hooks/useGenres";
import type { Platform } from "../hooks/useGames";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
  sortOrder: string;

  onSelectGenre: (genre: Genre) => void;
  onSelectPlatform: (platform: Platform) => void;
  onSelectSortOrder: (sortOrder: string) => void;
  onReset: () => void;
}

const MobileFilters = ({
  selectedGenre,
  selectedPlatform,
  sortOrder,
  onSelectGenre,
  onSelectPlatform,
  onSelectSortOrder,
  onReset,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box width="100%">
      <Flex gap={3} marginBottom={5} marginRight={3}>
        <Button
          flex={1}
          justifyContent="flex-start"
          variant="outline"
          leftIcon={<FiMenu />}
          onClick={() => setIsOpen((current) => !current)}
        >
          Filters
        </Button>

        <ResetFilters onReset={onReset} />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Flex
          direction="column"
          gap={3}
          padding={3}
          marginRight={3}
          marginBottom={5}
          borderWidth="1px"
          borderRadius="md"
        >
          <MobileGenreSelector
            selectedGenre={selectedGenre}
            onSelectGenre={onSelectGenre}
          />

          <PlatformSelector
            selectedPlatform={selectedPlatform}
            onSelectPlatform={onSelectPlatform}
          />

          <SortSelector
            sortOrder={sortOrder}
            onSelectSortOrder={onSelectSortOrder}
          />
        </Flex>
      </Collapse>
    </Box>
  );
};

export default MobileFilters;
