import { Flex, Heading, Text } from "@chakra-ui/react";
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
      borderWidth="1px"
      borderRadius="5px"
    >
      <Flex>
        <UpdootSection post={p} />
        <Flex px={4} flexDirection="column">
          <Flex alignItems="end">
            <NextLink href="/post/[id]" as={`/post/${p.id}`}>
              <Heading color="dark1" fontSize="lg" fontWeight="medium">
                {p.title}
              </Heading>
            </NextLink>
            <Text ml={2} fontSize="xs">
              posted by {p.creator.username}
            </Text>
            {meData?.me?.id !== p.creator.id ? null : (
              <EditDeletePostButtons id={p.id} />
            )}
          </Flex>
          <Text fontFamily="monospace" color="dark2" mt={4}>
            {p.textSnippet}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostComponent;
