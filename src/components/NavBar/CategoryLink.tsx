import { Heading } from "@chakra-ui/react";
import React from "react";
import { Router, useRouter } from "next/router";

interface CategoryLinkProps {
  url: string;
  category: string;
}

export const CategoryLink: React.FC<CategoryLinkProps> = ({
  url,
  category,
}: CategoryLinkProps) => {
  const router = useRouter();
  return (
    <a href={url}>
      <Heading
        _hover={{
          color: "green",
        }}
        transition="500ms"
        color={router.pathname.includes(category) ? "green" : "white2"}
        letterSpacing=".1em"
        fontWeight="normal"
        textTransform="uppercase"
        size="md"
      >
        {category}
      </Heading>
    </a>
  );
};
