import { ReactChild, useCallback, useState } from "react";
import { AxiosResponse } from "axios";
import cs from "classnames";

type Field<T> = {
  label: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
  className?: string;
};

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData: T) => Promise<AxiosResponse>;
    callback: () => void;
  };
};

export function useForm<T>(options: useFormOptions<T>) {
  const { fields, initFormData, buttons, submit } = options;

  const [formData, setFormData] = useState(options.initFormData);

  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      e[key] = [];
    }
    return e;
  });
  const onChange = useCallback(
    (key, value) => {
      setFormData({ ...formData, [key]: value });
    },
    [formData]
  );
  const _onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submit.request(formData).then(
        (res) => {
          // window.alert(submit.message);
          submit.callback();
        },
        (error) => {
          if (error.response.status === 422) {
            setErrors(error.response.data);
          } else if (error.response.status === 401) {
            alert(JSON.stringify(error.response.data));
            console.log(2222);
            window.location.href = `/sign_in?redirectTo=${location.pathname}`;
          } else {
            alert(JSON.stringify(error.response.data));
          }
        }
      );
    },
    [formData]
  );
  const form = (
    <>
      <form onSubmit={_onSubmit}>
        {fields.map((field) => (
          <div
            key={field.label}
            className={cs("field", `field-${field.key}`, field.className)}
          >
            <label htmlFor="" className="label">
              <span className="label-text">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  className="control"
                  onChange={(e) => onChange(field.key, e.target.value)}
                  value={formData[field.key].toString()}
                />
              ) : (
                <input
                  className="control"
                  type={field.type}
                  value={formData[field.key].toString()}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              )}
            </label>
            {errors[field.key].length ? (
              <p>{errors[field.key].join(",")}</p>
            ) : null}
          </div>
        ))}
        {buttons}
      </form>
      <style jsx>{`
        .field {
          margin: 8px 0;
        }
        .label {
          display: flex;
          line-height: 32px;
        }
        .label input {
          height: 32px;
        }
        .label > .label-text {
          white-space: nowrap;
          margin-right: 1em;
        }
        .label > .control {
          width: 100%;
        }
      `}</style>
    </>
  );
  return {
    form,
    setErrors,
  };
}