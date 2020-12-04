import "reflect-metadata";
import { createConnection } from "typeorm";
import {User} from "./entity/User";
import {Post} from "./entity/Post";
import {Comment} from "./entity/Comment";

createConnection()
  .then(async (connection) => {
      const {manager} = connection
      const u1 = new User()
      u1.username = 'lzb'
      u1.password = '123123'
      await manager.save(u1)
      const p1 = new Post()
      p1.title = '第一篇文章'
      p1.content = 'post content 1'
      p1.author = u1
      await manager.save(p1)
      const c1 = new Comment()
      c1.content = 'comment 1'
      c1.user = u1
      c1.post = p1
      await manager.save(c1)
     await connection.close();
  })
  .catch((error) => console.log(error));
