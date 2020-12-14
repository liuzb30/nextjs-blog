import axios from "axios";
import { NextPage } from "next";
import { useForm } from "../hooks/useForm";

const SignUp: NextPage = (props) => {
  const initFormData = {
    username: "",
    password: "",
    passwordComfirm: "",
  };
  const { form } = useForm({
    initFormData,
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" },
      { label: "确认密码", type: "password", key: "passwordComfirm" },
    ],
    buttons: <button type="submit">注册</button>,
    submit: {
      request: (formData) => axios.post("/api/v1/users", formData),
      callback: () => {
        window.alert("注册成功");
        window.location.href = "/post";
      },
    },
  });

  return (
    <div>
      <h1>注册页面</h1>
      {form}
    </div>
  );
};

export default SignUp;
