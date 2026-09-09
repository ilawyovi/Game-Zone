import { useState } from "react";
import { Box, Button, Collapse, Flex } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import MobileGenreSelector from "./MobileGenreSelector";
import PlatformSelector from "./PlatformSelector";
import DeveloperSelector from "./DeveloperSelector";
import PublisherSelector from "./PublisherSelector";
import SortSelector from "./SortSelector";
import ResetFilters from "./ResetFilters";

import type { Genre } from "../../hooks/useGenres";
import type { Platform } from "../../types/platform";
import type { Developer } from "../../types/developer";
import type { Publisher } from "../../types/publisher";

interface Props {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
  selectedDeveloper: Developer | null;
  selectedPublisher: Publisher | null;
  sortOrder: string;
  onSelectGenre: (genre: Genre) => void;
  onSelectPlatform: (platform: Platform) => void;
  onSelectDeveloper: (developer: Developer) => void;
  onSelectPublisher: (publisher: Publisher) => void;
  onSelectSortOrder: (sortOrder: string) => void;
  onReset: () => void;
}

const MobileFilters = ({
  selectedGenre,
  selectedPlatform,
  selectedDeveloper,
  selectedPublisher,
  sortOrder,
  onSelectGenre,
  onSelectPlatform,
  onSelectDeveloper,
  onSelectPublisher,
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

          <DeveloperSelector
            selectedDeveloper={selectedDeveloper}
            onSelectDeveloper={onSelectDeveloper}
          />

          <PublisherSelector
            selectedPublisher={selectedPublisher}
            onSelectPublisher={onSelectPublisher}
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