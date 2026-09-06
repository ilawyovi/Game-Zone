import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
interface Props {
  showLabel?: boolean;
}
const ColorModeSwitch = ({ showLabel = true }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        colorScheme="orange"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />

      {showLabel && <Text whiteSpace="nowrap"> Dark Mode </Text>}
    </HStack>
  );
};
export default ColorModeSwitch;
