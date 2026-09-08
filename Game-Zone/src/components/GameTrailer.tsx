import { Box, Text } from "@chakra-ui/react";

interface Movie {
  id: number;
  name: string;
  preview: string;
  data: {
    480?: string;
    max?: string;
  };
}

interface Props {
  movie: Movie;
}

const GameTrailer = ({ movie }: Props) => {
  const videoUrl = movie.data.max || movie.data[480];

  if (!videoUrl) return null;

  return (
    <Box>
      <Box
        overflow="hidden"
        borderRadius="xl"
        position="relative"
        aspectRatio={16 / 9}
        background="black"
      >
        <video
          controls
          poster={movie.preview}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Box>

      <Text
        marginTop={3}
        fontSize="sm"
        color="gray.500"
      >
        {movie.name}
      </Text>
    </Box>
  );
};

export default GameTrailer;