import { Box, Button, Textarea } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../../../utils/useGetPostFromUrl";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";

export const EditPost = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();
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
          //   const { error } = await createPost({ input: values });
          //   if (!error) {
          //     router.push("/");
          //   }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <Textarea name="text" placeholder="write here..." label="Body" />
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