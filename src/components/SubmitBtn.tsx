import { Button } from "@chakra-ui/react";
import React from "react";

interface SubmitBtnProps {
  state: boolean;
  text: string;
  confirmation: boolean;
  type: string;
  action: string;
}

export const SubmitBtn: React.FC<SubmitBtnProps> = ({
  state,
  text,
  confirmation,
  type,
  action,
}) => {
  return (
    <Button
      _hover={{
        bgColor: "green",
        borderColor: "green",
        color: "white",
      }}
      mt={4}
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
                `Are you sure you want to ${action} this ${type}?`
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
