import { NextApiHandler } from "next";
import { getDatabaseConnection } from "../../../../lib/getDatabaseConnection";
import withSession from "../../../../lib/withSession";

const Posts: NextApiHandler = withSession(async (req, res) => {
  const connection = await getDatabaseConnection();
  if (req.method === "PATCH") {
    const { title, content, id } = req.body;
    const post: Post = await connection.manager.findOne("Post", id);
    post.title = title;
    post.content = content;
    // @ts-ignore
    const user = req.session.get("currentUser");
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    await connection.manager.save(post);
    res.json(post);
  } else if (req.method === "DELETE") {
    const id = req.query.id;
    const result = await connection.manager.delete("Post", id);
    res.statusCode = result.affected >= 0 ? 200 : 400;
    res.end();
  }
});

export default Posts;
