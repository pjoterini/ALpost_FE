import { Flex, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useRouter } from "next/router";
import { SubmitBtn } from "../../../components/SubmitBtn";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

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
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          title: data.post.title,
          category: data.post.category,
          text: data.post.text,
        }}
        onSubmit={async (values) => {
          updatePost({ id: intId, ...values });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                name="category"
                placeholder="category"
                label="Category"
              />
            </Box>
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text"
                label="Body"
              />
            </Box>
            <Flex justify="space-between" align="center">
              <SubmitBtn
                text="Update post"
                state={isSubmitting}
                confirmation={true}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
