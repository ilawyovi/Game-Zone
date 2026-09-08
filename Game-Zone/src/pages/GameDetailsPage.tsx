import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function GameDetailsPage() {
  const { slug } = useParams();

  return (
    <Box padding={6}>
      <Heading>Game Details</Heading>

      <Text marginTop={4}>
        Game Slug: {slug}
      </Text>
    </Box>
  );
}

export default GameDetailsPage;