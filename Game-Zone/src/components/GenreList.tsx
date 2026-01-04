import useGenres from "../hooks/useGenres";
import { Text, HStack, Image, List, ListItem } from "@chakra-ui/react";
import { SkeletonText, SkeletonCircle } from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url";

const GenreList = () => {
  const { data, error, isLoading } = useGenres();
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  if (error) return null;

  return (
    <List>
      {isLoading
        ? skeletons.map((skeleton) => (
            <ListItem key={skeleton} paddingY="5px">
              <HStack>
                <SkeletonCircle boxSize="32px" />
                <SkeletonText noOfLines={1} width="100px" />
              </HStack>
            </ListItem>
          ))
        : data.map((genre) => (
            <ListItem key={genre.id} paddingY="5px">
              <HStack>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Text fontSize="lg">{genre.name}</Text>
              </HStack>
            </ListItem>
          ))}
    </List>
  );
};

export default GenreList;
