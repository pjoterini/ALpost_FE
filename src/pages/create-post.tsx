import { Flex, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";
import { SubmitBtn } from "../components/SubmitBtn";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", category: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (error?.message.includes("not authenticated")) {
            router.push("/login");
          } else {
            router.push("/");
          }
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
                text="Create Post"
                state={isSubmitting}
                confirmation={false}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
