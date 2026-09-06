import { HStack, Image, Show } from "@chakra-ui/react";
import Logo from "../assets/Logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import FavoritesButton from "./FavoritesButton";
import MobileMenu from "./MobileMenu";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack
      padding="10px"
      width="100%"
      spacing={2}
      minWidth={0}
      overflow="hidden"
    >
      <Image src={Logo} boxSize="60px" flexShrink={0} />
      <SearchInput onSearch={onSearch} />
      <Show above="lg">
        <FavoritesButton /> <ColorModeSwitch />
      </Show>
      <Show below="lg">
        <MobileMenu />
      </Show>
    </HStack>
  );
};

export default NavBar;
