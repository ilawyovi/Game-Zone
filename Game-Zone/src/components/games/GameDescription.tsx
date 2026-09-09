import { Box, Button, Collapse, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  description: string;
}

const GameDescription = ({ description }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) {
    return (
      <Text color="gray.500">
        No description available.
      </Text>
    );
  }

  return (
    <Box>
      <Collapse startingHeight={140} in={isExpanded} animateOpacity>
        <Text
          color="gray.500"
          lineHeight="1.9"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Collapse>

      <Button
        variant="link"
        marginTop={4}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? "Show Less" : "Read More"}
      </Button>
    </Box>
  );
};

export default GameDescription;