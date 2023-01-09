import { Box, Button, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { SettingsIcon } from "@chakra-ui/icons";
import { CategoryLink } from "./CategoryLink";
import { CreatePostBtn } from "../CreatePostBtn";
import { LogoLink } from "../LogoLink/LogoLink";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

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
      <Flex flexDir={{ base: "column", sm: "row" }} align="center">
        <CreatePostBtn />

        <Flex alignItems="center">
          <NextLink href="/user-account" legacyBehavior passHref>
            <Button role="group">
              <SettingsIcon
                _groupHover={{
                  color: "white",
                }}
                color="gray"
              />
              <Text
                _groupHover={{
                  color: "white",
                }}
                ml={2}
                mr={4}
                fontSize="xl"
                color="green"
              >
                {data.me.username}
              </Text>
            </Button>
          </NextLink>

          <Button
            color="red"
            onClick={async () => {
              await logout({});
              router.reload();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
            LOGOUT
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Box
        zIndex={2}
        position="relative"
        shadow="md"
        bgGradient="linear(to-l, secondary, primary)"
        p={4}
      >
        <Flex
          flexDir={{ base: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          margin="auto"
          maxWidth="800px"
        >
          <LogoLink />
          <Box>{body}</Box>
        </Flex>
      </Box>
      <Box
        zIndex={1}
        position="relative"
        shadow="md"
        bgGradient="linear(to-l, primary, secondary)"
      >
        <Flex
          py={3}
          px={3}
          alignItems="center"
          justifyContent="space-between"
          margin="auto"
          maxWidth="800px"
        >
          <CategoryLink url="/" category="main"></CategoryLink>
          <CategoryLink url="/sport" category="sport"></CategoryLink>
          <CategoryLink url="/health" category="health"></CategoryLink>
          <CategoryLink url="/music" category="music"></CategoryLink>
        </Flex>
      </Box>
    </>
  );
};
