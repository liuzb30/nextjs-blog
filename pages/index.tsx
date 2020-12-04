import "reflect-metadata";
import { GetServerSideProps, NextPage } from "next";
import { UAParser } from "ua-parser-js";
import { useEffect, useState } from "react";
import { Post } from "../src/entity/Post";
import { getDatabaseConnection } from "../lib/getDatabaseConnection";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const index: NextPage<Props> = (props) => {
  const { posts } = props;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const w = document.documentElement.clientWidth;
    setWidth(w);
  }, []);

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
export default index;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
};
