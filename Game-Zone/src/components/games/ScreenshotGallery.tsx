import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

interface Screenshot {
  id: number;
  image: string;
}

interface Props {
  screenshots: Screenshot[];
}

const ScreenshotGallery = ({ screenshots }: Props) => {
  const [selectedImage, setSelectedImage] = useState(
    screenshots[0]?.image || "",
  );

  if (!screenshots.length) return null;

  return (
    <Box>
      <Box
        overflow="hidden"
        borderRadius="xl"
        marginBottom={4}
        background="blackAlpha.200"
      >
        <Image
          src={selectedImage}
          alt="Game screenshot"
          width="100%"
          height={{ base: "220px", md: "400px", lg: "500px" }}
          objectFit="cover"
        />
      </Box>

      <SimpleGrid columns={{ base: 3, md: 5 }} spacing={3}>
        {screenshots.map((screenshot) => (
          <Box
            key={screenshot.id}
            cursor="pointer"
            overflow="hidden"
            borderRadius="lg"
            borderWidth="2px"
            borderColor={
              selectedImage === screenshot.image
                ? "blue.400"
                : "transparent"
            }
            transition="all 0.2s"
            _hover={{
              transform: "scale(1.03)",
            }}
            onClick={() => setSelectedImage(screenshot.image)}
          >
            <Image
              src={screenshot.image}
              alt="Game screenshot thumbnail"
              width="100%"
              height={{ base: "70px", md: "90px" }}
              objectFit="cover"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ScreenshotGallery;