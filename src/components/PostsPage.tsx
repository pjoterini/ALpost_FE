import { Stack, Flex, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { Layout } from "./Layout";
import PostComponent from "./Post";

interface PostsPageProps {
  searchFor: string;
  categoryHeading: string;
}

export const PostsPage: React.FC<PostsPageProps> = ({
  categoryHeading,
  searchFor,
}) => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
    search: searchFor,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return (
      <div>
        <div color="white">you got query failed for some reason</div>;
        <div color="white">{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      <Heading pb={5} color="white2" as="h2" size="md" noOfLines={1}>
        Category : {categoryHeading}
      </Heading>
      {fetching && !data ? (
        <div color="white">loading...</div>
      ) : (
        <Stack spacing={10}>
          {data!.posts.posts.map((post) =>
            !post ? null : (
              <PostComponent key={post.id} post={post} meData={meData} />
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
                search: variables.search,
              });
            }}
            isLoading={fetching}
            _hover={{
              bgColor: "green",
              borderColor: "green",
              color: "white",
            }}
            mt={6}
            px={6}
            mx="auto"
            type="submit"
            color="white"
            borderColor="green"
            border="1px solid white"
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};
