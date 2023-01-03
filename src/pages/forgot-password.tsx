import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Flex, Button, Box } from "@chakra-ui/react";
import { useForgotPasswordMutation } from "../generated/graphql";
import { LogoLink } from "../components/LogoLink/LogoLink";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Box pb={8}>
        <LogoLink />
      </Box>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
          console.log(values);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box color="white">
              if account with that email adress exists, we sent you an email
              there.
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                />
              </Box>
              <Flex justify="space-between" align="center">
                <Button
                  _hover={{
                    bgColor: "green",
                    borderColor: "green",
                    color: "white",
                  }}
                  mt={6}
                  px={6}
                  type="submit"
                  color="white"
                  borderColor="green"
                  border="1px solid white"
                  isLoading={isSubmitting}
                >
                  Reset password
                </Button>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
