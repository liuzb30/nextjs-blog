import {NextApiHandler} from "next";
import {getDatabaseConnection} from "../../../../lib/getDatabaseConnection";
import withSession from "../../../../lib/withSession";

const Posts:NextApiHandler = withSession( async (req,res)=>{
    console.log(req.method)
    if(req.method==='PATCH'){
        console.log(111)
        const connection = await getDatabaseConnection()
        const {title, content, id} = req.body;
        console.log(title,content,id)
        const post:Post = await connection.manager.findOne('Post',id)
        post.title = title
        post.content = content
        // @ts-ignore
        const user = req.session.get('currentUser')
        if(!user){
            res.statusCode = 401
            res.end()
            return
        }
        await connection.manager.save(post)
        res.json(post);
    }
})

export default Posts