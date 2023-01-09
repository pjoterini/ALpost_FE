import { Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface CreatePostBtnProps {}

export const CreatePostBtn: React.FC<CreatePostBtnProps> = ({}) => {
  return (
    <NextLink href="/create-post" legacyBehavior passHref>
      <Button
        _hover={{
          borderWidth: "1px",
          borderColor: "green",
          color: "white",
        }}
        transition="1s"
        color="white2"
        borderWidth="1px"
        borderColor="red"
        bgGradient="linear(to-r, primary, secondary)"
        flexDir={{ base: "column", sm: "row" }}
        mr={{ base: 0, sm: 10 }}
        my={{ base: 5, sm: 0 }}
      >
        CREATE POST
      </Button>
    </NextLink>
  );
};
