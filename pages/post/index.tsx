import "reflect-metadata";
import { Post } from "../../src/entity/Post";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import * as querystring from "querystring";
import { usePager } from "../../hooks/usePager";
import withSession from "../../lib/withSession";

type Props = {
  posts: Post[];
  totalCount: number;
  perPage: number;
  page: number;
  currentUser: User;
};

const PostsIndex: NextPage<Props> = (props) => {
  const { posts, totalCount, page, perPage, currentUser } = props;
  const totalPage = Math.ceil(totalCount / perPage);
  const { pager } = usePager({ page, totalPage });
  return (
    <>
      <div className="posts">
        <header>
          <h1>文章列表 {totalCount}</h1>
          {currentUser && (
            <Link href="/post/new">
              <a>新增文章</a>
            </Link>
          )}
        </header>
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
        .posts > header {
          display: flex;
          align-items: center;
        }
        .posts > header > h1 {
          margin: 0;
          margin-right: auto;
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
export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const index = context.req.url.indexOf("?");
    const perPage = 10;
    let page: string = "1";
    if (index > -1) {
      const query = querystring.parse(context.req.url.slice(index + 1));
      page = query.page?.toString() || "1";
    }

    const [posts, count] = await connection.manager.findAndCount(Post, {
      skip: perPage * (Number(page) - 1),
      take: perPage,
    });

    const currentUser = (context.req as any).session.get("currentUser") || null;
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        totalCount: count,
        perPage,
        page: Number(page),
        currentUser,
      },
    };
  }
);
