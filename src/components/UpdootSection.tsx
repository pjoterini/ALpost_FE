import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
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
        bgColor={post.voteStatus === 1 ? "green" : undefined}
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
      {post.points}
      <IconButton
        bgColor={post.voteStatus === -1 ? "red" : undefined}
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
