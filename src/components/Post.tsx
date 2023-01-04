import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { EditDeletePostButtons } from "./EditDeletePostButtons";
import { UpdootSection } from "./UpdootSection";
import NextLink from "next/link";
import { MeQuery, Post } from "../generated/graphql";

interface PostComponentProps {
  post: {
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

const PostComponent = ({ post, meData }: PostComponentProps) => {
  return (
    <Box
      width="100%"
      bg="primary"
      shadow="md"
      borderColor="secondary"
      borderWidth="2px"
      borderRadius="5px"
    >
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <UpdootSection post={post} />

        <Flex w="100%" justifyContent="space-between">
          <Flex mt={6} ml={4} flexDir="column">
            <NextLink href="/post/[id]" as={`/post/${post.id}`}>
              <Heading color="white" fontSize="lg" fontWeight="medium">
                {post.title}
              </Heading>
            </NextLink>
            <Text my={4} fontFamily="monospace" color="white1">
              {post.textSnippet}..
            </Text>
          </Flex>

          <Flex
            my={5}
            mx={5}
            flexShrink={0}
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            color="white2"
            fontSize="xs"
          >
            <Box>POSTED BY</Box>
            <Text pb={2} fontSize="md" color="green">
              {post.creator.username}
            </Text>
            <Box>CATEGORY</Box>
            <Text pb={2} fontSize="md" color="green">
              {post.category}
            </Text>
            {meData?.me?.id !== post.creator.id ? null : (
              <EditDeletePostButtons id={post.id} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostComponent;
