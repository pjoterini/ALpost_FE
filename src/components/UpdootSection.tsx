import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { background, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: {
    __typename?: "Post" | undefined;
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    category: string;
    points: number;
    textSnippet?: string;
    voteStatus?: number | null | undefined;
    creator: {
      __typename?: "User";
      id: number;
      username: string;
    };
  };
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  let voteStatusColor;

  if (post.voteStatus === 1) {
    voteStatusColor = "green";
  }
  if (post.voteStatus === -1) {
    voteStatusColor = "red";
  }
  if (post.voteStatus == undefined) {
    voteStatusColor = "gray";
  }

  return (
    <Flex p={4} align="center" flexDirection="column">
      <IconButton
        _hover={{
          borderColor: "white",
          borderWidth: "2px",
          bgColor: "secondary",
          color: "gray",
        }}
        size="sm"
        color="gray"
        bgColor={post.voteStatus === 1 ? "dark1" : "secondary"}
        borderWidth="2px"
        borderColor={post.voteStatus === 1 ? "green" : "secondary"}
        aria-label="updoot post"
        onClick={async () => {
          if (post.voteStatus === 1) {
            await vote({
              postId: post.id,
              value: 1,
            });
          } else {
            await vote({
              postId: post.id,
              value: 1,
            });
          }
        }}
      >
        <ChevronUpIcon h={6} w={6} />
      </IconButton>

      <Text color={voteStatusColor} py={2}>
        {post.points}
      </Text>

      <IconButton
        _hover={{
          borderColor: "white",
          borderWidth: "2px",
          bgColor: "secondary",
          color: "gray",
        }}
        size="sm"
        color="gray"
        bgColor={post.voteStatus === -1 ? "dark1" : "secondary"}
        borderWidth="2px"
        borderColor={post.voteStatus === -1 ? "red" : "secondary"}
        aria-label="downdoot post"
        onClick={async () => {
          if (post.voteStatus === -1) {
            await vote({
              postId: post.id,
              value: -1,
            });
          } else {
            await vote({
              postId: post.id,
              value: -1,
            });
          }
        }}
      >
        <ChevronDownIcon h={6} w={6} />
      </IconButton>
    </Flex>
  );
};
