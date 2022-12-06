import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { background, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex mr={4} align="center" flexDirection="column">
      <IconButton
        _hover={{
          borderColor: "white",
          borderWidth: "1px",
          background: "secondary",
          color: "dark2",
        }}
        size="sm"
        color="gray"
        bgColor="white"
        borderWidth="2px"
        borderColor={post.voteStatus === 1 ? "green" : "secondary"}
        aria-label="updoot post"
        onClick={() => {
          if (post.voteStatus === 1) {
            return;
          }
          vote({
            postId: post.id,
            value: 1,
          });
        }}
      >
        <ChevronUpIcon h={6} w={6} />
      </IconButton>
      <Text py={2}>{post.points}</Text>
      <IconButton
        _hover={{
          borderColor: "white",
          borderWidth: "1px",
          bgColor: "secondary",
          color: "dark2",
        }}
        size="sm"
        color="gray"
        bgColor="white"
        borderWidth="2px"
        borderColor={post.voteStatus === -1 ? "red" : "secondary"}
        aria-label="downdoot post"
        onClick={() => {
          if (post.voteStatus === -1) {
            return;
          }
          vote({
            postId: post.id,
            value: -1,
          });
        }}
      >
        <ChevronDownIcon h={6} w={6} />
      </IconButton>
    </Flex>
  );
};
