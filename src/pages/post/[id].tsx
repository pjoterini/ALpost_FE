import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../../components/Layout";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { useMeQuery } from "../../generated/graphql";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();
  const [{ data: meData }] = useMeQuery();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex flexDir="column">
        <Heading mt={8} fontSize="2xl" color="white2" mb={4}>
          {data.post.title}
        </Heading>
        <Text color="white" my={5} fontSize="l">
          {data.post.text}
        </Text>
        <Box mx="auto" my={5}>
          {meData?.me?.id !== data.post.creator.id ? null : (
            <EditDeletePostButtons id={data.post.id} />
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
