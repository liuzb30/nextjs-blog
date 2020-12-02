import axios from "axios";
import {NextPage} from "next";
import {useCallback, useState} from "react";

const SignIn:NextPage = ()=>{
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })
    const [errors, setErrors] = useState({
        username:[],
        password:[]
    })
    const onSubmit = useCallback(e=>{
        e.preventDefault()
        setErrors({
            username:[],
            password:[]
        })
        axios.post('/api/v1/sessions', {...formData}).then(res=>{
            console.log(res)
        },error=>{
            if(error.response.status===422){
                setErrors(error.response.data)
            }else{
                alert(JSON.stringify( error.response.data))
            }
        })
    }, [formData])
    return(<div>
        <h1>登录页面</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="">
                    用户名
                    <input type="text" value={formData.username} onChange={e=> setFormData({
                        ...formData,
                        username: e.target.value
                    })} />
                </label>
                {errors.username.length ? <p>{errors.username.join(',') }</p>:null}
            </div>

            <div>
                <label>
                    密码
                    <input type="password" value={formData.password} onChange={e=> setFormData({
                        ...formData,
                        password: e.target.value
                    })} />
                </label>
                {errors.password.length ? <p>{errors.password.join(',')}</p> :null}
            </div>

            <button type="submit">登录</button>
        </form>
    </div>)
}

export default SignIn