import {
  Box,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const GameDetailsSkeleton = () => {
  return (
    <Box padding={{ base: 4, md: 6, lg: 8 }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.4fr 1fr",
        }}
        gap={{ base: 6, lg: 10 }}
      >
        <GridItem>
          <Skeleton
            height={{ base: "240px", md: "360px", lg: "500px" }}
            borderRadius="xl"
          />
        </GridItem>

        <GridItem>
          <Stack spacing={5}>
            <Skeleton height="45px" width="80%" />

            <SkeletonText noOfLines={3} spacing={4} />

            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={4}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} height="70px" borderRadius="lg" />
              ))}
            </Grid>

            <Skeleton height="45px" width="180px" />
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default GameDetailsSkeleton;