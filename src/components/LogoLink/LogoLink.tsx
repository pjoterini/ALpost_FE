import React from "react";
import NextLink from "next/link";
import styles from "./logolink.module.css";

interface logoLinkProps {}

export const LogoLink: React.FC<logoLinkProps> = ({}) => {
  return (
    <NextLink href="/">
      <header>
        <span className={styles.al}>AL</span>
        <span className={styles.post}>POST</span>
      </header>
    </NextLink>
  );
};
