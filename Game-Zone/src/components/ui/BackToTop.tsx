import { ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight;

      const isAtBottom =
        scrollTop + viewportHeight >=
        documentHeight - 10;

      setIsVisible(isAtBottom);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <IconButton
      aria-label="Back to top"
      icon={<ChevronUpIcon boxSize={7} />}
      onClick={handleBackToTop}
      position="fixed"
      bottom={{
        base: 20,
        md: 8,
      }}
      right={{
        base: 4,
        md: 8,
      }}
      zIndex={9999}
      size={{
        base: "md",
        md: "lg",
      }}
      borderRadius="full"
      boxShadow="0 4px 14px rgba(0, 0, 0, 0.2)"
      _hover={{
        transform: "translateY(-3px)",
      }}
      transition="all 0.2s ease"
    />
  );
};

export default BackToTop;