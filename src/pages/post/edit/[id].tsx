import { Box, Textarea, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React from 'react'
import { createUrqlClient } from '../../../../utils/createUrqlClient';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import createPost from '../../create-post';

export const EditPost = ({}) => {
        return (

    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
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
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
        );
}

export default withUrqlClient(createUrqlClient)(EditPost)