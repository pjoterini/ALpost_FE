import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

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
          color: "accent",
        }}
        transition="500ms"
        color={router.pathname.includes(category) ? "accent" : "white2"}
        letterSpacing={{ base: "0em", sm: ".1em" }}
        fontWeight="normal"
        textTransform="uppercase"
        size="md"
      >
        {category}
      </Heading>
    </a>
  );
};
