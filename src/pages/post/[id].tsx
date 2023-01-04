import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../../components/Layout";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { useMeQuery, usePostsQuery } from "../../generated/graphql";
import { UpdootSection } from "../../components/UpdootSection";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();
  const [{ data: meData }] = useMeQuery();

  if (fetching) {
    return (
      <Layout>
        <Text color="white">Loading...</Text>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Text color="white">could not find post</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex>
        <UpdootSection post={data.post} />

        <Flex pl={4} flexDir="column">
          <Heading fontSize="2xl" color="white2" mb={4}>
            {data.post.title}
          </Heading>
          <Text color="white" my={5} fontSize="l">
            {data.post.text}
          </Text>

          <Flex alignItems="center" justifyContent="space-between">
            <Flex color="white2">
              <Box>POSTED BY</Box>
              <Text pl={3} fontSize="md" color="green">
                {data.post.creator.username}
              </Text>
              <Box pl={5}>CATEGORY</Box>
              <Text pl={3} fontSize="md" color="green">
                {data.post.category}
              </Text>
            </Flex>
            <Box my={5}>
              {meData?.me?.id !== data.post.creator.id ? null : (
                <EditDeletePostButtons id={data.post.id} />
              )}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
