import {NextApiHandler} from "next";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {User} from "../../../src/entity/User";
import md5 from "md5";

const users:NextApiHandler = async (req,res)=>{
    const {username, password, passwordComfirm} = req.body
    // 校验
    const user = new User()
    user.username = username
    user.password = password
    user.passwordComfirm = passwordComfirm
    await user.validator()
    // 判断是否有错误
    res.setHeader("Content-Type", "application/json");
    if(user.hasError()){
        res.statusCode = 422
        res.end(JSON.stringify(user.errors))
    }else{
        // 创建用户
        user.passwordDigest = md5(password)
        const connection = await getDatabaseConnection()
        await connection.manager.save(user)
        res.statusCode = 200;
        res.end(JSON.stringify(user));
    }
}

export default users