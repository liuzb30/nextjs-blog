import axios from "axios";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import { Form } from "../components/Form";

const SignUp: NextPage = (porops) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordComfirm: "",
  });
  const [errors, setErrors] = useState({
    username: [] as string[],
    password: [] as string[],
    passwordComfirm: [] as string[],
  });
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setErrors({
        username: [],
        password: [],
        passwordComfirm: [],
      });
      axios.post("/api/v1/users", { ...formData }).then(
        (res) => {
          alert("注册成功");
          // window.location.href = '/sign_in'
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
      <h1>注册页面</h1>
      <Form
        onSubmit={onSubmit}
        buttons={<button type="submit">注册</button>}
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
            {
                label: "确认密码",
                type: "text",
                value: formData.passwordComfirm,
                onChange: (e) => onChange("passwordComfirm", e.target.value),
                errors: errors.passwordComfirm,
            },
        ]}
      />
    </div>
  );
};

export default SignUp;
