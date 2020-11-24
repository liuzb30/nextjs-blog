import { NextPage } from "next";
import { getPosts } from "../../lib/posts";
import Link from "next/link";

const PostsIndex: NextPage<{ posts: Post[] }> = (props) => {
  const { posts } = props;
  return (
    <div>
      <h1>文章列表</h1>

      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id}>
          <a>{post.id}</a>
        </Link>
      ))}
    </div>
  );
};

export default PostsIndex;

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
