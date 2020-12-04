import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { User } from "../src/entity/User";
import withSession from "../lib/withSession";
import {useForm} from "../hooks/useForm";

const SignIn: NextPage<{ user: User }> = (props) => {
    const initFormData = {
        username: "",
        password: "",
    }
  const {form} = useForm({
      initFormData,
      fields:[
          {label:'用户名',type:'text',key:'username'},
          {label:'密码',type:'password', key:'password'}
      ],
      buttons:<button type="submit">登录</button>,
      submit:{
          request: fromData=> axios.post('/api/v1/sessions',fromData),
          message:'登录成功'
      }
  })

  return (
    <div>
      {props.user && <div>当前登录用户为{props.user.username}</div>}
      <h1>登录页面</h1>
        {form}
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser") || "";
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
);
