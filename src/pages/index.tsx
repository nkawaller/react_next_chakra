import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { UpvoteSection } from "../components/UpvoteSection";
import { DeleteIcon } from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>query failed!</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => !p ? null : (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <UpvoteSection post={p} />
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </Link>
                </NextLink>
                <Text>posted by {p.creator.username}</Text>
                <Flex align="center">
                  <Text flex={1} mt={4}>
                    {p.textSnippet}
                  </Text>
                  <IconButton
                    aria-label="delete post"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      deletePost({ id: p.id });
                    }}
                  />
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load More Posts
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
