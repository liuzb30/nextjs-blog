import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";
import {PostComment} from "./PostComment";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column('varchar')
    username:string;
    @Column('varchar')
    passwordDigest:string;
    @CreateDateColumn()
    createdAt:Date;
    @CreateDateColumn()
    updatedAt:Date;
    @OneToMany(type=>Post,post=>post.author)
    posts:Post[];
    @OneToMany(type=>PostComment, comment=>comment.user)
    comments:Comment[]
}
