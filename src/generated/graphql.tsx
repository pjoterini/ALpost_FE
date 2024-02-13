import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type Link = {
  __typename?: 'Link'
  link: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  changePassword: UserResponse
  createPost: Post
  createReply: Reply
  deletePost: Scalars['Boolean']
  deleteReply: Scalars['Boolean']
  forgotPassword: Link
  login: UserResponse
  logout: Scalars['Boolean']
  register: UserResponse
  updatePost?: Maybe<Post>
  updateReply?: Maybe<Reply>
  vote: Scalars['Boolean']
  voteReply: Scalars['Boolean']
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']
  token: Scalars['String']
}

export type MutationCreatePostArgs = {
  input: PostInput
}

export type MutationCreateReplyArgs = {
  input: ReplyInput
}

export type MutationDeletePostArgs = {
  id: Scalars['Int']
}

export type MutationDeleteReplyArgs = {
  id: Scalars['Int']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationLoginArgs = {
  password: Scalars['String']
  usernameOrEmail: Scalars['String']
}

export type MutationRegisterArgs = {
  options: UsernamePasswordInput
}

export type MutationUpdatePostArgs = {
  category: Scalars['String']
  id: Scalars['Int']
  text: Scalars['String']
  title: Scalars['String']
}

export type MutationUpdateReplyArgs = {
  id: Scalars['Int']
  text: Scalars['String']
}

export type MutationVoteArgs = {
  postId: Scalars['Int']
  value: Scalars['Int']
}

export type MutationVoteReplyArgs = {
  replyId: Scalars['Int']
  value: Scalars['Int']
}

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts'
  hasMore: Scalars['Boolean']
  posts: Array<Post>
}

export type PaginatedReplies = {
  __typename?: 'PaginatedReplies'
  hasMore: Scalars['Boolean']
  replies: Array<Reply>
}

export type Post = {
  __typename?: 'Post'
  category: Scalars['String']
  createdAt: Scalars['String']
  creator: User
  creatorId: Scalars['Float']
  id: Scalars['Float']
  points: Scalars['Float']
  replies: Array<Reply>
  text: Scalars['String']
  textSnippet: Scalars['String']
  title: Scalars['String']
  updatedAt: Scalars['String']
  voteStatus?: Maybe<Scalars['Int']>
}

export type PostInput = {
  category: Scalars['String']
  text: Scalars['String']
  title: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  me?: Maybe<User>
  post?: Maybe<Post>
  posts: PaginatedPosts
  replies: PaginatedReplies
  reply?: Maybe<Reply>
  userPosts: UserPosts
  userUpdoots: UserUpdoots
}

export type QueryPostArgs = {
  id: Scalars['Int']
}

export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
  search: Scalars['String']
}

export type QueryRepliesArgs = {
  cursor?: InputMaybe<Scalars['String']>
  limit: Scalars['Int']
  postid: Scalars['Int']
}

export type QueryReplyArgs = {
  id: Scalars['Int']
}

export type QueryUserPostsArgs = {
  userId: Scalars['Int']
}

export type QueryUserUpdootsArgs = {
  userId: Scalars['Int']
}

export type Reply = {
  __typename?: 'Reply'
  createdAt: Scalars['String']
  creator: User
  creatorId: Scalars['Float']
  id: Scalars['Float']
  points: Scalars['Float']
  post: Post
  postid: Scalars['Int']
  text: Scalars['String']
  updatedAt: Scalars['String']
  votes: Array<ReplyVote>
  voteStatus?: Maybe<Scalars['Int']>
}

export type ReplyInput = {
  postid: Scalars['Int']
  text: Scalars['String']
}

export type ReplyVote = {
  __typename?: 'ReplyVote'
  reply: Reply
  replyId: Scalars['Float']
  user: User
  userId: Scalars['Float']
  value: Scalars['Float']
}

export type Updoot = {
  __typename?: 'Updoot'
  post: Post
  postId: Scalars['Float']
  user: User
  userId: Scalars['Float']
  value: Scalars['Float']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']
  email: Scalars['String']
  id: Scalars['Float']
  posts: Array<Post>
  replies: Array<Reply>
  replyvotes: Array<ReplyVote>
  updatedAt: Scalars['String']
  votes: Array<Updoot>
  username: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type UsernamePasswordInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type UserPosts = {
  __typename?: 'userPosts'
  posts: Array<Post>
}

export type UserUpdoots = {
  __typename?: 'userUpdoots'
  votes: Array<Updoot>
}

export type PostSnippetFragment = {
  __typename?: 'Post'
  id: number
  createdAt: string
  updatedAt: string
  title: string
  category: string
  points: number
  textSnippet: string
  voteStatus?: number | null
  creator: { __typename?: 'User'; id: number; username: string }
}

export type RegularErrorFragment = {
  __typename?: 'FieldError'
  field: string
  message: string
}

export type RegularUserFragment = {
  __typename?: 'User'
  id: number
  username: string
  createdAt: string
  email: string
}

export type RegularUserResponseFragment = {
  __typename?: 'UserResponse'
  errors?: Array<{
    __typename?: 'FieldError'
    field: string
    message: string
  }> | null
  user?: {
    __typename?: 'User'
    id: number
    username: string
    createdAt: string
    email: string
  } | null
}

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']
  newPassword: Scalars['String']
}>

export type ChangePasswordMutation = {
  __typename?: 'Mutation'
  changePassword: {
    __typename?: 'UserResponse'
    errors?: Array<{
      __typename?: 'FieldError'
      field: string
      message: string
    }> | null
    user?: {
      __typename?: 'User'
      id: number
      username: string
      createdAt: string
      email: string
    } | null
  }
}

export type CreatePostMutationVariables = Exact<{
  input: PostInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: {
    __typename?: 'Post'
    id: number
    title: string
    category: string
    text: string
    creatorId: number
    points: number
    createdAt: string
    updatedAt: string
  }
}

export type CreateReplyMutationVariables = Exact<{
  input: ReplyInput
}>

export type CreateReplyMutation = {
  __typename?: 'Mutation'
  createReply: {
    __typename?: 'Reply'
    id: number
    text: string
    points: number
    voteStatus?: number | null
    creatorId: number
    postid: number
    createdAt: string
    updatedAt: string
  }
}

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: boolean
}

export type DeleteReplyMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteReplyMutation = {
  __typename?: 'Mutation'
  deleteReply: boolean
}

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']
}>

export type ForgotPasswordMutation = {
  __typename?: 'Mutation'
  forgotPassword: { __typename?: 'Link'; link: string }
}

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'UserResponse'
    errors?: Array<{
      __typename?: 'FieldError'
      field: string
      message: string
    }> | null
    user?: { __typename?: 'User'; id: number; username: string } | null
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'UserResponse'
    errors?: Array<{
      __typename?: 'FieldError'
      field: string
      message: string
    }> | null
    user?: { __typename?: 'User'; id: number; username: string } | null
  }
}

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int']
  title: Scalars['String']
  text: Scalars['String']
  category: Scalars['String']
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost?: {
    __typename?: 'Post'
    id: number
    title: string
    text: string
    category: string
    textSnippet: string
  } | null
}

export type UpdateReplyMutationVariables = Exact<{
  id: Scalars['Int']
  text: Scalars['String']
}>

export type UpdateReplyMutation = {
  __typename?: 'Mutation'
  updateReply?: { __typename?: 'Reply'; id: number; text: string } | null
}

export type VoteMutationVariables = Exact<{
  value: Scalars['Int']
  postId: Scalars['Int']
}>

export type VoteMutation = { __typename?: 'Mutation'; vote: boolean }

export type VoteReplyMutationVariables = Exact<{
  value: Scalars['Int']
  replyId: Scalars['Int']
}>

export type VoteReplyMutation = { __typename?: 'Mutation'; voteReply: boolean }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: number
    username: string
    createdAt: string
    email: string
  } | null
}

export type PostQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type PostQuery = {
  __typename?: 'Query'
  post?: {
    __typename?: 'Post'
    id: number
    createdAt: string
    updatedAt: string
    title: string
    points: number
    text: string
    category: string
    voteStatus?: number | null
    creator: { __typename?: 'User'; id: number; username: string }
  } | null
}

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['String']>
  search: Scalars['String']
}>

export type PostsQuery = {
  __typename?: 'Query'
  posts: {
    __typename?: 'PaginatedPosts'
    hasMore: boolean
    posts: Array<{
      __typename?: 'Post'
      id: number
      createdAt: string
      updatedAt: string
      title: string
      category: string
      points: number
      textSnippet: string
      voteStatus?: number | null
      creator: { __typename?: 'User'; id: number; username: string }
    }>
  }
}

export type RepliesQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: InputMaybe<Scalars['String']>
  postid: Scalars['Int']
}>

export type RepliesQuery = {
  __typename?: 'Query'
  replies: {
    __typename?: 'PaginatedReplies'
    hasMore: boolean
    replies: Array<{
      __typename?: 'Reply'
      id: number
      text: string
      points: number
      voteStatus?: number | null
      postid: number
      createdAt: string
      updatedAt: string
      creator: { __typename?: 'User'; id: number; username: string }
    }>
  }
}

export type ReplyQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type ReplyQuery = {
  __typename?: 'Query'
  reply?: {
    __typename?: 'Reply'
    id: number
    createdAt: string
    updatedAt: string
    points: number
    text: string
    voteStatus?: number | null
    creator: { __typename?: 'User'; id: number; username: string }
  } | null
}

export type UserPostsQueryVariables = Exact<{
  userId: Scalars['Int']
}>

export type UserPostsQuery = {
  __typename?: 'Query'
  userPosts: {
    __typename?: 'userPosts'
    posts: Array<{
      __typename?: 'Post'
      id: number
      createdAt: string
      updatedAt: string
      title: string
      category: string
      points: number
      textSnippet: string
      voteStatus?: number | null
      creator: { __typename?: 'User'; id: number; username: string }
    }>
  }
}

export type UserUpdootsQueryVariables = Exact<{
  userId: Scalars['Int']
}>

export type UserUpdootsQuery = {
  __typename?: 'Query'
  userUpdoots: {
    __typename?: 'userUpdoots'
    votes: Array<{ __typename?: 'Updoot'; userId: number }>
  }
}

export const PostSnippetFragmentDoc = gql`
  fragment PostSnippet on Post {
    id
    createdAt
    updatedAt
    title
    category
    points
    textSnippet
    voteStatus
    creator {
      id
      username
    }
  }
`
export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
    createdAt
    email
  }
`
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      errors {
        ...RegularError
      }
      user {
        ...RegularUser
      }
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument)
}
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      category
      text
      creatorId
      points
      createdAt
      updatedAt
    }
  }
`

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  )
}
export const CreateReplyDocument = gql`
  mutation CreateReply($input: ReplyInput!) {
    createReply(input: $input) {
      id
      text
      points
      voteStatus
      creatorId
      postid
      createdAt
      updatedAt
    }
  }
`

export function useCreateReplyMutation() {
  return Urql.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(
    CreateReplyDocument
  )
}
export const DeletePostDocument = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument
  )
}
export const DeleteReplyDocument = gql`
  mutation DeleteReply($id: Int!) {
    deleteReply(id: $id)
  }
`

export function useDeleteReplyMutation() {
  return Urql.useMutation<DeleteReplyMutation, DeleteReplyMutationVariables>(
    DeleteReplyDocument
  )
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      link
    }
  }
`

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument)
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  )
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  )
}
export const UpdatePostDocument = gql`
  mutation UpdatePost(
    $id: Int!
    $title: String!
    $text: String!
    $category: String!
  ) {
    updatePost(id: $id, title: $title, text: $text, category: $category) {
      id
      title
      text
      category
      textSnippet
    }
  }
`

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument
  )
}
export const UpdateReplyDocument = gql`
  mutation UpdateReply($id: Int!, $text: String!) {
    updateReply(id: $id, text: $text) {
      id
      text
    }
  }
`

export function useUpdateReplyMutation() {
  return Urql.useMutation<UpdateReplyMutation, UpdateReplyMutationVariables>(
    UpdateReplyDocument
  )
}
export const VoteDocument = gql`
  mutation Vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument)
}
export const VoteReplyDocument = gql`
  mutation VoteReply($value: Int!, $replyId: Int!) {
    voteReply(value: $value, replyId: $replyId)
  }
`

export function useVoteReplyMutation() {
  return Urql.useMutation<VoteReplyMutation, VoteReplyMutationVariables>(
    VoteReplyDocument
  )
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options
  })
}
export const PostDocument = gql`
  query Post($id: Int!) {
    post(id: $id) {
      id
      createdAt
      updatedAt
      title
      points
      text
      category
      voteStatus
      creator {
        id
        username
      }
    }
  }
`

export function usePostQuery(
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>
) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({
    query: PostDocument,
    ...options
  })
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String, $search: String!) {
    posts(limit: $limit, cursor: $cursor, search: $search) {
      hasMore
      posts {
        ...PostSnippet
      }
    }
  }
  ${PostSnippetFragmentDoc}
`

export function usePostsQuery(
  options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>
) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    ...options
  })
}
export const RepliesDocument = gql`
  query Replies($limit: Int!, $cursor: String, $postid: Int!) {
    replies(limit: $limit, cursor: $cursor, postid: $postid) {
      hasMore
      replies {
        id
        text
        points
        voteStatus
        creator {
          id
          username
        }
        postid
        createdAt
        updatedAt
      }
    }
  }
`

export function useRepliesQuery(
  options: Omit<Urql.UseQueryArgs<RepliesQueryVariables>, 'query'>
) {
  return Urql.useQuery<RepliesQuery, RepliesQueryVariables>({
    query: RepliesDocument,
    ...options
  })
}
export const ReplyDocument = gql`
  query Reply($id: Int!) {
    reply(id: $id) {
      id
      createdAt
      updatedAt
      points
      text
      voteStatus
      creator {
        id
        username
      }
    }
  }
`

export function useReplyQuery(
  options: Omit<Urql.UseQueryArgs<ReplyQueryVariables>, 'query'>
) {
  return Urql.useQuery<ReplyQuery, ReplyQueryVariables>({
    query: ReplyDocument,
    ...options
  })
}
export const UserPostsDocument = gql`
  query UserPosts($userId: Int!) {
    userPosts(userId: $userId) {
      posts {
        ...PostSnippet
      }
    }
  }
  ${PostSnippetFragmentDoc}
`

export function useUserPostsQuery(
  options: Omit<Urql.UseQueryArgs<UserPostsQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserPostsQuery, UserPostsQueryVariables>({
    query: UserPostsDocument,
    ...options
  })
}
export const UserUpdootsDocument = gql`
  query UserUpdoots($userId: Int!) {
    userUpdoots(userId: $userId) {
      votes {
        userId
      }
    }
  }
`

export function useUserUpdootsQuery(
  options: Omit<Urql.UseQueryArgs<UserUpdootsQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserUpdootsQuery, UserUpdootsQueryVariables>({
    query: UserUpdootsDocument,
    ...options
  })
}
