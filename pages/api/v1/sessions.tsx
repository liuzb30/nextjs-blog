import {NextApiHandler} from "next";
// @ts-ignore
import {SignIn} from "../../../src/model/SignIn";
import withSession from "../../../lib/withSession";

const Sessions:NextApiHandler = async (req,res)=>{
    console.log(req.body)
    // @ts-ignore
    console.log(req.session)
    // 判断用户是否存在
    const {username,password} = req.body
    const signIn = new SignIn()
    signIn.username = username
    signIn.password = password
    await signIn.validate()

    if(signIn.hasError()){
        res.statusCode = 422
        res.end(JSON.stringify(signIn.errors))
    }else {
        // 用户名密码正确，生成session
        // @ts-ignore
        req.session.set('user',signIn.user)
        res.statusCode=200
        res.end('用户名密码正确')
    }
}

export default withSession(Sessions)