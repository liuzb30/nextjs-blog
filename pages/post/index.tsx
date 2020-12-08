import "reflect-metadata";
import {Post} from "../../src/entity/Post";
import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";

type Props = {
  posts: Post[];
};

const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props;

  return (
      <div>
        <h1>文章列表</h1>
        {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <a> {post.title}</a>
            </Link>
        ))}
      </div>
  );
};
export default PostsIndex;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
};
