import { NextApiHandler } from "next";
import { getPosts } from "lib/posts";
import withSession from "../../../lib/withSession";
import { Post } from "../../../src/entity/Post";
import { getDatabaseConnection } from "../../../lib/getDatabaseConnection";

const posts: NextApiHandler = withSession(async (req, res) => {
  const { title, content } = req.body;
  const post = new Post();
  post.title = title;
  post.content = content;
  // @ts-ignore
  const user = req.session.get("currentUser");
  console.log(user);
  post.author = user;
  const connection = await getDatabaseConnection();
  await connection.manager.save(post);
  res.json(post);
});

export default posts;
