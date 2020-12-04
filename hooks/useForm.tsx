import {ReactChild, useCallback, useState} from "react";
import axios from "axios";

type Field<T> = {
    label:string;
    type: 'text' | 'password' | 'textarea';
    key: keyof T;
}
type Submit = {
    url:string;
    message:string;
}

type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit:Submit
}
export function useForm<T>(options:useFormOptions<T>){
    const {fields, initFormData,buttons,submit} = options

    const [formData, setFormData] = useState(options.initFormData)

    const [errors, setErrors] = useState(()=>{
        const e:{[k in keyof T]?:string[]} = {}
        for(let key in initFormData){
            e[key] = []
        }
        return e
    });
    const onChange = useCallback(
        (key, value) => {
            setFormData({ ...formData, [key]: value });
        },
        [formData]
    );
    const _onSubmit = useCallback((e)=>{
        e.preventDefault();
        axios.post(submit.url, { ...formData }).then(
            (res) => {
                window.alert(submit.message);
            },
            (error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data);
                } else {
                    alert(JSON.stringify(error.response.data));
                }
            }
        );
    },[formData])
    const form = (
        <form onSubmit={_onSubmit}>
            {fields.map(field=>
                <div key={field.label}>
                    <label htmlFor="">
                        {field.label}
                        {field.type==='textarea' ?
                            <textarea onChange={e=> onChange(field.key,e.target.value)} value={formData[field.key].toString()} />
                            :<input
                                type={field.type}
                                value={formData[field.key].toString()}
                                onChange={e=> onChange(field.key,e.target.value)}
                            />
                        }

                    </label>
                    {errors[field.key].length ? <p>{errors[field.key].join(",")}</p> : null}
                </div>
            )}
            {buttons}
        </form>
    )
    return {
        form, setErrors
    }
}