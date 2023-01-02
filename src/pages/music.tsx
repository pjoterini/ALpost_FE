import { withUrqlClient } from "next-urql";
import { PostsPage } from "../components/PostsPage";
import { createUrqlClient } from "../utils/createUrqlClient";

export const Music = () => {
  return <PostsPage category="Music" />;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Music);
