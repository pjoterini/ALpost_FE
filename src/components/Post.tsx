import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { EditDeletePostButtons } from "./EditDeletePostButtons";
import { UpdootSection } from "./UpdootSection";
import NextLink from "next/link";
import { MeQuery, Post } from "../generated/graphql";

interface PostComponentProps {
  p: {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    category: string;
    points: number;
    textSnippet: string;
    voteStatus?: number | null | undefined;
    creator: {
      __typename?: "User" | undefined;
      id: number;
      username: string;
    };
  };
  meData: MeQuery | undefined;
}

const PostComponent = ({ p, meData }: PostComponentProps) => {
  return (
    <Flex
      bg="primary"
      key={p.id}
      p={5}
      shadow="md"
      borderColor="secondary"
      borderWidth="2px"
      borderRadius="5px"
    >
      <Flex>
        <UpdootSection post={p} />
        <Flex px={4} flexDirection="column">
          <Flex alignItems="center">
            <NextLink href="/post/[id]" as={`/post/${p.id}`}>
              <Heading mr={8} color="white" fontSize="lg" fontWeight="medium">
                {p.title}
              </Heading>
            </NextLink>
            {meData?.me?.id !== p.creator.id ? null : (
              <EditDeletePostButtons id={p.id} />
            )}
            <Flex
              flexShrink="0"
              flexDir="column"
              color="white2"
              ml={4}
              fontSize="xs"
            >
              <Text>
                POSTED BY -
                <Text ml={2} fontSize="md" display="inline" color="green">
                  {p.creator.username}
                </Text>
              </Text>
              <Box>
                CATEGORY -
                <Text ml={2} fontSize="md" display="inline" color="green">
                  {p.category}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Text fontFamily="monospace" color="white1" mt={4}>
            {p.textSnippet}..
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostComponent;
