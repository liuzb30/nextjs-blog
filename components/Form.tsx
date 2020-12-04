import {ChangeEventHandler, FormEventHandler, ReactChild, ReactChildren} from "react";

type Props = {
    onSubmit:FormEventHandler,
    fields:{
        label:string,
        type:'text' | 'password',
        value: string | number,
        onChange:ChangeEventHandler<HTMLInputElement>,
        errors: string[]
    }[],
    buttons: ReactChild
}
export const Form:React.FC<Props> = (props)=>{
    const {onSubmit} = props

    return (
        <form onSubmit={onSubmit}>
            {props.fields.map(field=>
                <div>
                    <label htmlFor="">
                        {field.label}
                        <input
                            type={field.type}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    </label>
                    {field.errors.length ? <p>{field.errors.join(",")}</p> : null}
                </div>
            )}
            {props.buttons}
        </form>
    )
}