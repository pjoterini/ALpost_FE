import { withUrqlClient } from "next-urql";
import { PostsPage } from "../components/PostsPage";
import { createUrqlClient } from "../utils/createUrqlClient";

export const Music = () => {
  return <PostsPage categoryHeading="Music" />;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Music);
