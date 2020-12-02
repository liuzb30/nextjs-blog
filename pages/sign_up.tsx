import axios from "axios";
import { NextPage } from "next";
import {useCallback, useState} from "react";

const SignUp: NextPage = (porops) => {
    const [formData, setFormData]= useState({
        username:'',
        password:'',
        passwordComfirm:''
    })
    const [errors, setErrors] = useState({
        username:[] as string[],
        password:[] as string[],
        passwordComfirm:[] as string[],
    })
    const onSubmit = useCallback(e=>{
        e.preventDefault()
        setErrors({
            username:[] ,
            password:[] ,
            passwordComfirm:[] ,
        })
        axios.post('/api/v1/users', {...formData}).then(res=>{
            alert('注册成功')
            // window.location.href = '/sign_in'
        },error=>{
            if(error.response.status===422){
                setErrors(error.response.data)
            }else{
                alert(JSON.stringify( error.response.data))
            }
        })
    }, [formData])
    return (<div>
        <h1>注册页面</h1>
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

            <div>
                <label >
                    重置密码
                    <input type="password" value={formData.passwordComfirm} onChange={e=> setFormData({
                        ...formData,
                        passwordComfirm: e.target.value
                    })} />
                </label>
                {errors.passwordComfirm.length? <p>{errors.passwordComfirm.join(',')}</p>:null}
            </div>
            <button type="submit">注册</button>
        </form>
    </div>)
};

export default SignUp;
