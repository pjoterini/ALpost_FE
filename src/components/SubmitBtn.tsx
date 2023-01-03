import { Button } from "@chakra-ui/react";
import React from "react";

interface SubmitBtnProps {
  state: boolean;
  text: string;
  confirmation: boolean;
}

export const SubmitBtn: React.FC<SubmitBtnProps> = ({
  state,
  text,
  confirmation,
}) => {
  return (
    <Button
      _hover={{
        bgColor: "green",
        borderColor: "green",
        color: "white",
      }}
      mt={6}
      px={6}
      type="submit"
      color="white"
      borderColor="green"
      border="1px solid white"
      isLoading={state}
      onClick={
        confirmation
          ? (e) => {
              const result = confirm(
                "Are you sure you want to update this post?"
              );
              if (result === false) {
                e.preventDefault();
              }
              return;
            }
          : () => {
              return;
            }
      }
    >
      {text}
    </Button>
  );
};
