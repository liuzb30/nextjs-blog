import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import md5 from "md5";
import _ from 'lodash'

@Entity('users')
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
    @OneToMany(type=>Comment, comment=>comment.user)
    comments:Comment[]
    password:string;
    passwordComfirm:string;
    errors={
        username:[] as string [],
        password:[] as string[],
        passwordComfirm:[]as string[]
    }
    @BeforeInsert()
    updatePasswordComfirm(){
        this.passwordDigest = md5(this.password)
    }


    async validator(){
        const {username, password, passwordComfirm} = this
        if(username.trim()===''){
            this.errors.username.push('用户名不能为空')
        }
        if(username.trim().length<4){
            this.errors.username.push('用户名不能少于4位')
        }
        if(password===''){
            this.errors.password.push('密码不能为空')
        }
        if(password.length<6){
            this.errors.password.push('密码不能少于6位数')
        }
        if(password!==passwordComfirm){
            this.errors.passwordComfirm.push('密码不一致')
        }
        const connection = await getDatabaseConnection()
        const user = await connection.manager.findOne(User, {where:{username}})

        if(user){
            this.errors.username.push('用户名已存在')
        }
    }
    hasError(){
        return Object.values(this.errors).some(value=>value.length>0)
    }

    toJSON(){
        return _.omit(this, ['password','passwordComfirm', 'passwordDigest', 'errors'])
    }
}
