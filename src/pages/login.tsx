import { Box, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../components/InputField'
import { LogoLink } from '../components/LogoLink/LogoLink'
import { SubmitBtn } from '../components/SubmitBtn'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from '../utils/toErrorMap'

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <Wrapper variant='small'>
      <Box pb={8}>
        <LogoLink />
      </Box>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values)

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='username or email'
              label='Username or Email'
            />
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type='password'
              />
            </Box>
            <Flex justify='space-between' alignItems='center'>
              <SubmitBtn
                text='Login'
                state={isSubmitting}
                confirmation={false}
                type=''
                action=''
              />

              <NextLink href='/forgot-password'>
                <Box
                  color='white2'
                  _hover={{
                    color: 'green'
                  }}
                >
                  Forgot password?
                </Box>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
