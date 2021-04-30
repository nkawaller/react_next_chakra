import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading');
    const [,vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async() => {
            setLoadingState('upvote-loading')
            await vote({
                postId: post.id,
                value: 1,
            });
            setLoadingState('not-loading')
        }}
        isLoading={loadingState === 'upvote-loading'}
        aria-label="Up vote"
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton 
        onClick={async() => {
            setLoadingState('downvote-loading')
            await vote({
                postId: post.id,
                value: -1,
            })
            setLoadingState('not-loading')
        }}
        isLoading={loadingState === 'downvote-loading'}
      aria-label="Down vote" icon={<ChevronDownIcon />} />
    </Flex>
  );
};
