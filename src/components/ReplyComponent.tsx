import { ChatIcon, ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
import { Flex, Heading, Button, Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { MeQuery } from "../generated/graphql";
import { EditDeletePostButtons } from "./EditDeletePostButtons";
import { ReplyUpdootSection } from "./replyUpdootSection";
import { UpdootSection } from "./UpdootSection";

interface ReplyComponentProps {
  reply: {
    id: number;
    createdAt: string;
    updatedAt: string;
    points: number;
    text: string;
    voteStatus?: number | null | undefined;
    creatorId: number;
  };
  meData: MeQuery | undefined;
}

const ReplyComponent = ({ reply, meData }: ReplyComponentProps) => {
  return (
    <>
      <Box
        bg="primary"
        shadow="md"
        borderColor="secondary"
        borderWidth="2px"
        borderRadius="5px"
      >
        <Flex w="100%" alignItems="center" justifyContent="space-between">
          <ReplyUpdootSection reply={reply} />

          <Flex w="100%" justifyContent="space-between">
            <Flex mt={6} ml={4} flexDir="column">
              <Text my={4} fontFamily="monospace" color="white1">
                {reply.text}
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
                {reply.creatorId}
              </Text>

              {meData?.me?.id !== reply.creatorId ? null : (
                <EditDeletePostButtons id={reply.id} />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default ReplyComponent;
