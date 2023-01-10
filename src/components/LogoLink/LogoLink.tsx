import React from "react";
import Link from "next/link";
import { Heading, Text } from "@chakra-ui/react";

interface logoLinkProps {}

export const LogoLink: React.FC<logoLinkProps> = ({}) => {
  return (
    <Link href="/">
      <Heading>
        <Text
          as="span"
          letterSpacing="-0.15cm"
          fontSize="50px"
          fontWeight="500"
          bgGradient="linear(to-t, #501f3a, #e6e6e6)"
          bgClip="text"
        >
          AL
        </Text>
        <Text
          as="span"
          letterSpacing="-0.05cm"
          fontSize="35px"
          fontWeight="400"
          bgGradient="linear(to-t, #bfbfbf, #595959)"
          bgClip="text"
        >
          POST
        </Text>
      </Heading>
    </Link>
  );
};
