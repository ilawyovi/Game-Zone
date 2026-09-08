import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import useDevelopers from "../hooks/useDevelopers";
import type { Developer } from "../types/developer";

interface Props {
  onSelectDeveloper: (developer: Developer) => void;
  selectedDeveloper: Developer | null;
}

const DeveloperSelector = ({
  onSelectDeveloper,
  selectedDeveloper,
}: Props) => {
  const { data, error } = useDevelopers();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedDeveloper?.name || "Developer"}
      </MenuButton>

      <MenuList maxHeight="300px" overflowY="auto">
        {data.map((developer) => (
          <MenuItem
            key={developer.id}
            onClick={() => onSelectDeveloper(developer)}
          >
            {developer.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DeveloperSelector;