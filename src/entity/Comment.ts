import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column('varchar')
    content:string;
    @CreateDateColumn()
    createdAt:Date;
    @CreateDateColumn()
    updatedAt:Date;
    @ManyToOne(type=>User, user=>user.comments)
    user:User;
    @ManyToOne(type=>Post, post=>post.comments)
    post:Post;
}
