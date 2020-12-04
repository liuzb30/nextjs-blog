import {NextApiHandler} from "next";
import {SignIn} from "../../../src/model/SignIn";
import withSession from "../../../lib/withSession";

const Sessions:NextApiHandler = async (req,res)=>{
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
        req.session.set('currentUser',signIn.user)
        // @ts-ignore
        await req.session.save()
        res.statusCode=200
        res.end(JSON.stringify(signIn.user))
    }
}

export default withSession(Sessions)