import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { EditDeletePostButtons } from "./EditDeletePostButtons";
import { UpdootSection } from "./UpdootSection";
import NextLink from "next/link";
import {
  MeQuery,
  Post,
  useCreateReplyMutation,
  useRepliesQuery,
} from "../generated/graphql";
import { ChatIcon, ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
import { SubmitBtn } from "./SubmitBtn";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
import { InputField } from "./InputField";
import ReplyComponent from "./ReplyComponent";

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
  // REPLY FORM, CREATE REPLY
  const router = useRouter();
  const [, createReply] = useCreateReplyMutation();

  const [showReplyInputs, setShowReplyInputs] = useState(false);
  let replyInputs;
  showReplyInputs
    ? (replyInputs = (
        <Formik
          initialValues={{ text: "", postid: post.id }}
          onSubmit={async (values) => {
            const { error } = await createReply({ input: values });
            if (error?.message.includes("not authenticated")) {
              router.push("/login");
            } else {
              setShowReplyInputs((prev) => !prev);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mx="auto" width="96%" mt={4}>
                <InputField
                  textarea
                  name="text"
                  placeholder="text"
                  label="Reply"
                  maxLength={400}
                />
                <Box display="none">
                  <InputField
                    readOnly
                    value={post.id}
                    name="postid"
                    label="postid"
                  />
                </Box>
              </Box>
              <Flex mb={4} justify="center" align="center">
                <SubmitBtn
                  text="Create Reply"
                  state={isSubmitting}
                  confirmation={false}
                  action="create"
                  type="reply"
                />
              </Flex>
            </Form>
          )}
        </Formik>
      ))
    : null;
  // SHOW REPLIES, PAGINATION
  const [answerCountFive, setAnswersCountFive] = useState(false);
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
    postid: post.id,
  });
  const [{ data, error, fetching }] = useRepliesQuery({
    variables,
  });

  const [showReplies, setShowReplies] = useState(false);
  let show;
  showReplies ? (show = "") : (show = "none");

  if (!fetching && !data) {
    return (
      <Box>
        <Text color="white">
          you got query for replies failed for some reason
        </Text>
        ;<Text color="white">{error?.message}</Text>
      </Box>
    );
  }

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

        <Flex
          flexDir={{ base: "column", sm: "row" }}
          w="100%"
          justifyContent="space-between"
        >
          <Flex mt={6} ml={4} flexDir="column">
            <NextLink href="/post/[id]" as={`/post/${post.id}`}>
              <Heading color="white" fontSize="lg" fontWeight="medium">
                {post.title}
              </Heading>
            </NextLink>
            <Text my={4} fontWeight="light" color="white">
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

      <Flex color="white2" alignItems="center" justifyContent="center">
        <ChatIcon h={4} />
        <Text color="white" ml={1} mr={8} mb={1}>
          &#40;
          {(data && data.replies.hasMore) || answerCountFive ? ">" : ""}
          {answerCountFive ? 5 : data?.replies.replies.length}
          &#41;
        </Text>
        {data?.replies.replies.length !== 0 ? (
          <Button
            onClick={() => {
              setShowReplies((prev) => !prev);
            }}
          >
            <Text
              _hover={{
                color: "white",
              }}
              mb={1}
            >
              See Answers
            </Text>
            <ChevronDownIcon color="white" h={7} w={7} />
          </Button>
        ) : (
          <Text mb={1}>Be first to answer!</Text>
        )}

        <Button
          onClick={() => {
            setShowReplyInputs((prev) => !prev);
          }}
          color="green"
          ml={5}
        >
          <Text color="white" mb={1} mr={2}>
            Reply
          </Text>
          <RepeatIcon />
        </Button>
      </Flex>
      {replyInputs}
      {fetching && !data ? (
        <Text color="white">loading...</Text>
      ) : (
        <Stack
          style={{
            display: `${show}`,
            marginInline: "auto",
            width: "96%",
          }}
        >
          {data!.replies.replies.map((reply) =>
            !reply ? null : (
              <Box key={reply.id}>
                <ReplyComponent reply={reply} meData={meData} />
                <Box mb={4} />
              </Box>
            )
          )}
        </Stack>
      )}
      {data && data.replies.hasMore ? (
        <Flex>
          <Button
            style={{
              display: `${show}`,
            }}
            onClick={() => {
              setAnswersCountFive(true);
              setVariables({
                limit: variables.limit,
                cursor:
                  data.replies.replies[data.replies.replies.length - 1]
                    .createdAt,
                postid: variables.postid,
              });
            }}
            isLoading={fetching}
            _hover={{
              bgColor: "green",
              borderColor: "green",
              color: "white",
            }}
            mb={2}
            px={6}
            mx="auto"
            type="submit"
            color="white"
            borderColor="green"
            border="1px solid white"
          >
            Load Others
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};

export default PostComponent;
