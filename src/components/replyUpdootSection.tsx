import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { background, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  useVoteReplyMutation,
} from "../generated/graphql";

interface ReplyUpdootSectionProps {
  reply: {
    __typename?: "Reply" | undefined;
    id: number;
    createdAt: string;
    updatedAt: string;
    points: number;
    text: string;
    voteStatus?: number | null | undefined;
    creator: {
      id: number;
      username: string;
    };
  };
}

export const ReplyUpdootSection: React.FC<ReplyUpdootSectionProps> = ({
  reply,
}) => {
  const [, voteReply] = useVoteReplyMutation();
  let voteStatusColor;

  if (reply.voteStatus === 1) {
    voteStatusColor = "green";
  }
  if (reply.voteStatus === -1) {
    voteStatusColor = "red";
  }
  if (reply.voteStatus == undefined) {
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
        bgColor={reply.voteStatus === 1 ? "green" : "secondary"}
        borderWidth="2px"
        borderColor={reply.voteStatus === 1 ? "green" : "secondary"}
        aria-label="updoot reply"
        onClick={async () => {
          if (reply.voteStatus === 1) {
            await voteReply({
              replyId: reply.id,
              value: 1,
            });
          } else {
            await voteReply({
              replyId: reply.id,
              value: 1,
            });
          }
        }}
      >
        <ChevronUpIcon h={6} w={6} />
      </IconButton>

      <Text color={voteStatusColor} py={2}>
        {reply.points}
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
        bgColor={reply.voteStatus === -1 ? "red" : "secondary"}
        borderWidth="2px"
        borderColor={reply.voteStatus === -1 ? "red" : "secondary"}
        aria-label="downdoot reply"
        onClick={async () => {
          if (reply.voteStatus === -1) {
            await voteReply({
              replyId: reply.id,
              value: -1,
            });
          } else {
            await voteReply({
              replyId: reply.id,
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
