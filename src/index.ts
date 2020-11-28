import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
// import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    // console.log(connection);
    const posts = await connection.manager.find(Post);
    console.log(posts);
    const p = new Post({ title: "post 1", content: "my first post" });
    await connection.manager.save(p);
    const post2 = await connection.manager.find(Post);
    console.log(post2);
    connection.close();
  })
  .catch((error) => console.log(error));
