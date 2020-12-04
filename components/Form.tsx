import {ChangeEventHandler, FormEventHandler, ReactChild, ReactChildren} from "react";

type Props = {
    onSubmit:FormEventHandler,
    fields:{
        label:string,
        type:'text' | 'password' | 'textarea',
        value: string | number,
        onChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
        errors: string[]
    }[],
    buttons: ReactChild
}
export const Form:React.FC<Props> = (props)=>{
    const {onSubmit} = props

    return (
        <form onSubmit={onSubmit}>
            {props.fields.map(field=>
                <div key={field.label}>
                    <label htmlFor="">
                        {field.label}
                        {field.type==='textarea' ?
                            <textarea onChange={field.onChange} value={field.value} />
                            :<input
                                type={field.type}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        }

                    </label>
                    {field.errors.length ? <p>{field.errors.join(",")}</p> : null}
                </div>
            )}
            {props.buttons}
        </form>
    )
}