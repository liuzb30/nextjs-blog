import axios from "axios";
import { NextPage } from "next";
import { useForm } from "../../hooks/useForm";

const PostNew: NextPage = (props) => {
  const initFormData = {
    title: "",
    content: "",
  };
  const { form } = useForm({
    initFormData,
    fields: [
      { label: "大标题", type: "text", key: "title" },
      { label: "内容", type: "textarea", key: "content" },
    ],
    buttons: (
      <div className="actions">
        <button type="submit">提交</button>
      </div>
    ),
    submit: {
      request: (formData) => axios.post("/api/v1/posts", formData),
      callback: () => {
        window.alert("提交成功");
        window.location.href = "/post";
      },
    },
  });
  return (
    <div className="postsNew wrapper">
      <div className="form-wrapper">{form}</div>
      <style jsx global>{`
        .form-wrapper {
          padding: 16px;
        }
        .postsNew .field-content textarea {
          height: 20em;
          resize: none;
        }
        .postsNew .label-text {
          width: 4em;
          text-align: right;
        }
        .postsNew .actions {
          text-align: center;
          //background: #ddd;
          padding: 4px 0;
        }
      `}</style>
    </div>
  );
};

export default PostNew;
