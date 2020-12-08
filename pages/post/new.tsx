import axios from "axios";
import {NextPage} from "next";
import {useForm} from "../../hooks/useForm";

const PostNew: NextPage = (props) => {
    const initFormData = {
        title:'',
        content:''
    }
    const {form} = useForm({
        initFormData,
        fields:[
            {label:'title',type:'text',key:'title'},
            {label:'内容',type:'textarea',key:'content'},
        ],
        buttons:<button type="submit">提交</button>,
        submit:{request: (formData)=> axios.post('/api/v1/posts',formData),callback:()=>window.alert('提交成功')}
    })
    return (
        <div>
            {form}
        </div>
    )
}

export default PostNew