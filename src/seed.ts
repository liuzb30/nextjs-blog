import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";

createConnection()
  .then(async (connection) => {
    // const p = new Post({ title: "post 1", content: "my first post" });
    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
      (n) => new Post({ title: `post ${n}`, content: `我的第${n}篇文章` })
    );
    await connection.manager.save(posts);
    const posts2 = await connection.manager.find(Post);
    console.log(posts2);
    connection.close();
  })
  .catch((error) => console.log(error));
