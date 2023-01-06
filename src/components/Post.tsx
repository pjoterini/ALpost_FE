import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { EditDeletePostButtons } from "./EditDeletePostButtons";
import { UpdootSection } from "./UpdootSection";
import NextLink from "next/link";
import { MeQuery, Post, useCreateReplyMutation } from "../generated/graphql";
import { ChatIcon, ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
import { SubmitBtn } from "./SubmitBtn";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
import { InputField } from "./InputField";

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
  // REPLY FORM
  const router = useRouter();
  useIsAuth();
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
                />
              </Flex>
            </Form>
          )}
        </Formik>
      ))
    : null;
  // SHOW ANSWERS

  return (
    <>
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
        {/* if there are replies whos this btn else show text 'no answers yet */}
        <Flex color="white2" alignItems="center" justifyContent="center">
          <ChatIcon h={4} />
          <Text color="white" ml={1} mr={8} mb={1}>
            &#40; 4 &#41;
          </Text>
          <Text mb={1}>See Answers</Text>
          <ChevronDownIcon color="white" h={7} w={7} />
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
      </Box>
    </>
  );
};

export default PostComponent;
