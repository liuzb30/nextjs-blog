import {User} from "../entity/User";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import md5 from "md5";

export class SignIn{
    username:string;
    password:string;
    user:User;

    errors ={
        username:[] as string[],
        password: [] as string[]
    }

    async validate(){
        if(this.username.trim()===''){
            this.errors.username.push('请填写用户名')
            return
        }
        const connection = await getDatabaseConnection()
        const {username,password}=this
        const user = await connection.manager.findOne(User, {where:{username}})
        this.user = user
        if(!user){
            this.errors.username.push('用户名不存在')
        }else if(user.passwordDigest!==md5(password)){
            this.errors.password.push('密码不匹配')
        }
    }
    hasError(){
        return !!Object.values(this.errors).some(value=>value.length>0)
    }
}