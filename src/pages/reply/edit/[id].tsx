import { Box, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { SubmitBtn } from "../../../components/SubmitBtn";
import {
  useReplyQuery,
  useUpdateReplyMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditReply: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useReplyQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updateReply] = useUpdateReplyMutation();

  if (fetching) {
    return (
      <Layout>
        <Text color="white">loading...</Text>
      </Layout>
    );
  }

  if (!data?.reply) {
    return (
      <Layout>
        <Box>Could not find reply</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          text: data.reply.text,
        }}
        onSubmit={async (values) => {
          updateReply({ id: intId, ...values });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box my={4}>
              <InputField
                textarea
                name="text"
                placeholder="text"
                label="Reply"
                maxLength={400}
                required={true}
              />
            </Box>
            <Flex justify="space-between" align="center">
              <SubmitBtn
                text="Update reply"
                state={isSubmitting}
                confirmation={true}
                type="Reply"
                action="update"
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditReply);
