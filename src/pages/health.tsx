import { withUrqlClient } from "next-urql";
import { PostsPage } from "../components/PostsPage";
import { createUrqlClient } from "../utils/createUrqlClient";

export const Health = () => {
  return <PostsPage searchFor="health" categoryHeading="Health" />;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Health);
