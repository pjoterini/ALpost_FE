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
          color: "accent",
        }}
        color="dark1"
        fontWeight="medium"
        size="md"
      >
        {category}
      </Heading>
    </NextLink>
  );
};
