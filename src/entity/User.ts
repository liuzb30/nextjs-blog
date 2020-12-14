import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import md5 from "md5";
import _ from "lodash";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar")
  username: string;
  @Column("varchar")
  passwordDigest: string;
  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;
  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];
  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];
  password: string;
  passwordComfirm: string;
  @BeforeInsert()
  updatePasswordComfirm() {
    this.passwordDigest = md5(this.password);
  }
  toJSON() {
    return _.omit(this, [
      "password",
      "passwordComfirm",
      "passwordDigest",
    ]);
  }
}
