import { HTMLInputTypeAttribute, InputHTMLAttributes, Ref } from "react"

interface TextboxComponent extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string,
    type?: HTMLInputTypeAttribute,
    name?: string,
    ref?: Ref<any>
}

export default function Textbox({ placeholder, className, type, name, ref, ...rest } :TextboxComponent) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-start text-xl">{placeholder}</label>
            <input ref={ref} required type={type} {...rest} name={name}
            className={`border-gray-500 disabled:bg-gray-200 transition-all duration-300 p-2 text-black border rounded outline-0 ${className}`} placeholder={placeholder}/>
        </div>
    )
}