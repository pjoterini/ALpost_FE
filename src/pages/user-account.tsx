import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { LogoLink } from "../components/LogoLink/LogoLink";
import PostComponent from "../components/Post";
import { InfoRow } from "../components/UserAccount/InfoRow";
import { Wrapper } from "../components/Wrapper";
import {
  useMeQuery,
  useUserPostsQuery,
  useUserUpdootsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface userAccountProps {}

const UserAccount: React.FC<userAccountProps> = ({}) => {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => setIsServer(false), []);
  const [{ data, fetching }] = useMeQuery({ pause: isServer });

  const variables = {
    userId: data?.me?.id as number,
  };
  const [{ data: userPostsData, fetching: userPostsFetching }] =
    useUserPostsQuery({ variables });
  const [{ data: userUpdootsData, fetching: userUpdootsFetching }] =
    useUserUpdootsQuery({ variables });

  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Flex fontSize="large" fontWeight="medium" color="white">
        <Box color="green" mr={5}>
          <NextLink href="/login">Login</NextLink>
        </Box>
        <NextLink href="/register">Register</NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex
        mt={10}
        minH="400px"
        minW="250px"
        borderRadius={5}
        border="1px solid gray"
        p={5}
        bgGradient="linear(to-l, secondary, primary)"
        justifyContent="space-between"
        flexDir="column"
      >
        <Text
          width="100%"
          mb={4}
          borderRadius={5}
          border="1px solid gray"
          textAlign="center"
          py={1}
          color="white"
          fontSize="large"
        >
          ACCOUNT INFO
        </Text>
        <InfoRow keyText="Username :" infoData={data.me.username} />
        <InfoRow keyText="Email :" infoData={data.me.email} />
        <InfoRow keyText="Your unique id :" infoData={data.me.id} />
        <InfoRow
          keyText="Posts created :"
          infoData={userPostsData?.userPosts.posts.length}
        />
        <InfoRow
          keyText="Votes given :"
          infoData={userUpdootsData?.userUpdoots.updoots.length}
        />
        <InfoRow
          keyText="Account creation date :"
          infoData={data.me.createdAt}
        />
      </Flex>
    );
  }

  return (
    <Wrapper variant="small">
      <LogoLink />
      {body}
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(UserAccount);
