import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });
  return (
    <Layout>
      <NextLink href='create-post'>
        <Link>create post</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
        {data.posts.map((p) => (
           <Box key={p.id} p={5} shadow="md" borderWidth="1px">
           <Heading fontSize="xl">{p.title}</Heading>
           <Text mt={4}>{p.text.slice(0,50)}</Text>
         </Box>
        ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
