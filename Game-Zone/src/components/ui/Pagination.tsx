import { Button, HStack } from "@chakra-ui/react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <HStack
      justifyContent="center"
      spacing={2}
      paddingY={8}
      paddingX={4}
      flexWrap="wrap"
    >
      <Button
        size="sm"
        variant="outline"
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {pages.map((page, index) =>
        page === "..." ? (
          <Button
            key={`ellipsis-${index}`}
            size="sm"
            variant="ghost"
            isDisabled
          >
            ...
          </Button>
        ) : (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? "solid" : "outline"}
            colorScheme={currentPage === page ? "orange" : undefined}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        size="sm"
        variant="outline"
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;

