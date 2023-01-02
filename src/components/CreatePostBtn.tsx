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
        color="gray"
        borderWidth="1px"
        borderColor="red"
        bgGradient="linear(to-r, primary, secondary)"
        mr={10}
      >
        CREATE POST
      </Button>
    </NextLink>
  );
};
