import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { Post } from "../../src/entity/Post";
import marked from "marked";
import withSession from "../../lib/withSession";
import Link from "next/link";
import { useCallback } from "react";
import axios from "axios";

type Props = {
  id: number;
  post: Post;
  currentUser: User;
};
const postsShow: NextPage<Props> = (props) => {
  const { post, currentUser, id } = props;
  const onRemove = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(
      (res) => {
        window.alert("删除成功");
        location.href = "/post";
      },
      () => {
        window.alert("删除失败");
      }
    );
  }, [id]);
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>{post.title}</h1>
          {currentUser && (
            <p>
              <Link href="/post/[id]/edit" as={`/post/${post.id}/edit`}>
                <a>编辑</a>
              </Link>
              <button onClick={onRemove}>删除</button>
            </p>
          )}
        </header>
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        ></article>
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 800px;
          margin: 16px auto;
          padding: 0 16px;
        }

        h1 {
          padding-bottom: 16px;
          border-bottom: 1px solid #666;
        }
        button {
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = withSession(async (context: GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const id = context.params.id as string;
  const post = await connection.manager.findOne(Post, id);
  const currentUser = (context.req as any).session.get("currentUser") || null;
  return {
    props: {
      id: parseInt(id),
      post: JSON.parse(JSON.stringify(post)),
      currentUser,
    },
  };
});
