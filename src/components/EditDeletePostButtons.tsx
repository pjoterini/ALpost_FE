import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Box, Flex } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
}) => {
  const [, deletePost] = useDeletePostMutation();

  return (
    <Flex alignItems="end">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          _hover={{
            borderColor: "gray",
            borderWidth: "1px",
          }}
          color="gray"
          size="sm"
          borderColor="secondary"
          borderWidth="1px"
          mx={4}
          aria-label="go to edit post page"
        >
          <EditIcon />
        </IconButton>
      </NextLink>

      <IconButton
        _hover={{
          borderColor: "gray",
          borderWidth: "1px",
        }}
        size="sm"
        color="gray"
        borderColor="secondary"
        borderWidth="1px"
        aria-label="Delete Post"
        onClick={(e) => {
          const result = confirm("Are you sure you want to delete this post?");
          if (result === false) {
            return;
          }
          deletePost({ id });
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Flex>
  );
};
