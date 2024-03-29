import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { useGetIntId } from "../../../../utils/useGetIntId";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { usePostQuery, useUpdatePostMutation } from "../../../generated/graphql";

export const EditPost = ({}) => {
    const router = useRouter();
    const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
      pause: intId === -1,
      variables: {
          id: intId,
      }
  });
  const [, updatePost] = useUpdatePostMutation()
  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Sorry, could not find that post</Box>
      </Layout>
    );
  }
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({id: intId, ...values})
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField name="text" placeholder="write here..." label="Body" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);