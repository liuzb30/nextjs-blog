import axios from "axios";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {useCallback, useState} from "react";
import {User} from "../src/entity/User";
import withSession from "../lib/withSession";

const SignIn: NextPage<{ user:User }> = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  });
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setErrors({
        username: [],
        password: [],
      });
      axios.post("/api/v1/sessions", { ...formData }).then(
        (res) => {
          window.alert('登录成功')
        },
        (error) => {
          if (error.response.status === 422) {
            setErrors(error.response.data);
          } else {
            alert(JSON.stringify(error.response.data));
          }
        }
      );
    },
    [formData]
  );
  return (
    <div>
        {
            props.user && <div>当前登录用户为{props.user.username}</div>
        }
      <h1>登录页面</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">
            用户名
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
            />
          </label>
          {errors.username.length ? <p>{errors.username.join(",")}</p> : null}
        </div>

        <div>
          <label>
            密码
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </label>
          {errors.password.length ? <p>{errors.password.join(",")}</p> : null}
        </div>

        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default SignIn

export const getServerSideProps: GetServerSideProps = withSession( async (context:GetServerSidePropsContext)=>{
    // @ts-ignore
    const user = context.req.session.get('currentUser') || ''
    return {
        props:{
            user: JSON.parse(JSON.stringify(user))
        }
    }
})