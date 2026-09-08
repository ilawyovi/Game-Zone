import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import usePublishers from "../hooks/usePublishers";
import type { Publisher } from "../types/publisher";

interface Props {
  onSelectPublisher: (publisher: Publisher) => void;
  selectedPublisher: Publisher | null;
}

const PublisherSelector = ({
  onSelectPublisher,
  selectedPublisher,
}: Props) => {
  const { data, error } = usePublishers();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPublisher?.name || "Publisher"}
      </MenuButton>

      <MenuList maxHeight="300px" overflowY="auto">
        {data.map((publisher) => (
          <MenuItem
            key={publisher.id}
            onClick={() => onSelectPublisher(publisher)}
          >
            {publisher.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PublisherSelector;