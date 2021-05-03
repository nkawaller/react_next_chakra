import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
}) => {
    const [, deletePost ] = useDeletePostMutation();
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          aria-label="edit post"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        aria-label="delete post"
        icon={<DeleteIcon />}
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
