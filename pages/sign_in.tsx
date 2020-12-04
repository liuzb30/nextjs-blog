import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useCallback, useState } from "react";
import { User } from "../src/entity/User";
import withSession from "../lib/withSession";
import { Form } from "../components/Form";

const SignIn: NextPage<{ user: User }> = (props) => {
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
          window.alert("登录成功");
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
  const onChange = useCallback(
    (key, value) => {
      setFormData({ ...formData, [key]: value });
    },
    [formData]
  );
  return (
    <div>
      {props.user && <div>当前登录用户为{props.user.username}</div>}
      <h1>登录页面</h1>
      <Form
        onSubmit={onSubmit}
        fields={[
          {
            label: "用户名",
            type: "text",
            value: formData.username,
            onChange: (e) => onChange("username", e.target.value),
            errors: errors.username,
          },
          {
            label: "密码",
            type: "password",
            value: formData.password,
            onChange: (e) => onChange("password", e.target.value),
            errors: errors.password,
          },
        ]}
        buttons={<button type="submit">登录</button>}
      ></Form>
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
