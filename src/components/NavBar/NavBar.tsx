import { Box, Link, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import styles from "./NavBar.module.css";
import { SettingsIcon } from "@chakra-ui/icons";
import { CategoryLink } from "../CategoryLink";
import { CreatePostBtn } from "../CreatePostBtn";

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
      <Flex align="center">
        <CreatePostBtn />

        <Flex alignItems="center">
          <NextLink href="/userAccount" legacyBehavior passHref>
            <Button>
              <SettingsIcon color="gray" />
              <Text ml={2} mr={4} fontSize="xl" color="green">
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
        className={styles.background}
        p={4}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          margin="auto"
          maxWidth="800px"
        >
          <NextLink href="/">
            <header>
              <span className={styles.al}>AL</span>
              <span className={styles.post}>POST</span>
            </header>
          </NextLink>
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
