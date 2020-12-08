import "reflect-metadata";
import { Post } from "../../src/entity/Post";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import * as querystring from "querystring";

type Props = {
  posts: Post[];
  totalCount: number;
  perPage: number;
  page: number;
};

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, totalCount, page } = props;
  // const totalPage = Math.ceil(totalCount / perPage);
  return (
    <div>
      <h1>文章列表 {totalCount}</h1>
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <a> {post.title}</a>
        </Link>
      ))}
      <div>
        <Link href={`?page=${page - 1}`}>
          <a>上一页</a>
        </Link>{" "}
        |
        <Link href={`?page=${page + 1}`}>
          <a>下一页</a>
        </Link>
      </div>
    </div>
  );
};
export default PostsIndex;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const index = context.req.url.indexOf("?");
  const perPage = 1;
  let page: string = "1";
  if (index > -1) {
    const query = querystring.parse(context.req.url.slice(index + 1));
    page = query.page?.toString() || "1";
  }

  const [posts, count] = await connection.manager.findAndCount(Post, {
    skip: perPage * (Number(page) - 1),
    take: perPage,
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      totalCount: count,
      perPage,
      page: Number(page),
    },
  };
};
