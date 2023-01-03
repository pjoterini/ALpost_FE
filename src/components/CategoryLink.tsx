import { Heading } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface CategoryLinkProps {
  url: string;
  category: string;
}

export const CategoryLink: React.FC<CategoryLinkProps> = ({
  url,
  category,
}: CategoryLinkProps) => {
  return (
    <NextLink href={url}>
      <Heading
        _hover={{
          color: "green",
        }}
        transition="500ms"
        color="white2"
        letterSpacing=".1em"
        fontWeight="normal"
        textTransform="uppercase"
        size="md"
      >
        {category}
      </Heading>
    </NextLink>
  );
};
