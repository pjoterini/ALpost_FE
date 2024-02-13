import { Box, Flex, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { InputField } from '../components/InputField'
import { LogoLink } from '../components/LogoLink/LogoLink'
import { Wrapper } from '../components/Wrapper'
import { useForgotPasswordMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false)
  const [linkMail, setLinkMail] = useState('')
  const [, forgotPassword] = useForgotPasswordMutation()

  return (
    <Wrapper variant='small'>
      <Box pb={8}>
        <LogoLink />
      </Box>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          let result = await forgotPassword(values)
          let linkData = result.data?.forgotPassword.link
          setLinkMail(linkData as string)

          setComplete(true)
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <>
              <Box color='white' pb={5}>
                If this address exists you should see working link beneath.
              </Box>
              <a href={linkMail}>
                <Box color='green'>{linkMail}</Box>
              </a>
            </>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name='email'
                  placeholder='Email'
                  label='Email'
                  type='email'
                />
              </Box>
              <Flex justify='space-between' align='center'>
                <Button
                  _hover={{
                    bgColor: 'green',
                    borderColor: 'green',
                    color: 'white'
                  }}
                  mt={6}
                  px={6}
                  type='submit'
                  color='white'
                  borderColor='green'
                  border='1px solid white'
                  isLoading={isSubmitting}
                >
                  Send me link
                </Button>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
