import "reflect-metadata";
import { Post } from "../../src/entity/Post";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import * as querystring from "querystring";
import { usePager } from "../../hooks/usePager";

type Props = {
  posts: Post[];
  totalCount: number;
  perPage: number;
  page: number;
};

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, totalCount, page, perPage } = props;
  const totalPage = Math.ceil(totalCount / perPage);
  const { pager } = usePager({ page, totalPage });
  return (
    <>
      <div className='posts'>
        <h1>文章列表 {totalCount}</h1>
        {posts.map((post) => (
          <div className="onePost">
            <Link key={post.id} href={`/post/${post.id}`}>
              <a> {post.title}</a>
            </Link>
          </div>
        ))}
        <div>{pager}</div>
      </div>
      <style jsx>{`
        .posts {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
        }
        .onePost {
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
        }
        .onePost > a {
          border-bottom: none;
          color: #000;
        }
        .onePost > a:hover {
          color: #00adb5;
        }
      `}</style>
    </>
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
