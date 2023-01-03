import { Box, Flex, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { LogoLink } from "../components/LogoLink/LogoLink";
import { InfoRow } from "../components/UserAccount/InfoRow";
import { Wrapper } from "../components/Wrapper";
import { useMeQuery, useUserPostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface userAccountProps {}

const UserAccount: React.FC<userAccountProps> = ({}) => {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => setIsServer(false), []);
  const [{ data, fetching }] = useMeQuery({ pause: isServer });

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
        minH="300px"
        minW="250px"
        justifyContent="space-between"
        flexDir="column"
      >
        <Text
          mb={4}
          borderRadius={5}
          px="8"
          mx="auto"
          bg="secondary"
          color="white"
          fontSize="large"
        >
          ACCOUNT INFO
        </Text>
        <InfoRow keyText="Username :" infoData={data.me.username} />
        <InfoRow keyText="Email :" infoData={data.me.email} />
        <InfoRow keyText="Your unique id :" infoData={data.me.id} />

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
