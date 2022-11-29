import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Box } from "@chakra-ui/react";
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
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton mr={2} aria-label="go to edit post page">
          <EditIcon />
        </IconButton>
      </NextLink>

      <IconButton
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id });
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
