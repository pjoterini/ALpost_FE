import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeleteReplyMutation } from "../generated/graphql";

interface EditDeleteReplyButtonsProps {
  id: number;
}

export const EditDeleteReplyButtons: React.FC<EditDeleteReplyButtonsProps> = ({
  id,
}) => {
  const [, deleteReply] = useDeleteReplyMutation();

  return (
    <Flex mt={2}>
      <NextLink href="/reply/edit/[id]" as={`/reply/edit/${id}`}>
        <IconButton
          _hover={{
            borderColor: "gray",
            borderWidth: "1px",
          }}
          color="gray"
          size="sm"
          borderColor="secondary"
          borderWidth="1px"
          aria-label="go to edit reply page"
        >
          <EditIcon />
        </IconButton>
      </NextLink>

      <IconButton
        _hover={{
          borderColor: "gray",
          borderWidth: "1px",
        }}
        ml={3}
        size="sm"
        color="gray"
        borderColor="secondary"
        borderWidth="1px"
        aria-label="Delete Reply"
        onClick={(e) => {
          const result = confirm("Are you sure you want to delete this reply?");
          if (result === false) {
            return;
          }
          deleteReply({ id });
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Flex>
  );
};
