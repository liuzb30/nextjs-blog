import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {PostComment} from "./PostComment";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column('varchar')
    title:string;
    @Column('text')
    content:string;
    @CreateDateColumn()
    createdAt:Date;
    @CreateDateColumn()
    updatedAt:Date;
    @ManyToOne(type=>User, user=>user.posts)
    author:User;
    @OneToMany(type=>PostComment, comment=>comment.post)
    comments:PostComment[]
}
