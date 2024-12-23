import { HTMLAttributes, HTMLInputTypeAttribute } from "react"

interface TextboxComponent extends HTMLAttributes<HTMLInputElement> {
    placeholder: string,
    type?: HTMLInputTypeAttribute,
    name?: string
}

export default function Textbox({ placeholder, className, type, name, ...rest } :TextboxComponent) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-start text-xl">{placeholder}</label>
            <input required type={type} {...rest} name={name}
            className={`border-gray-500 transition-all duration-300 p-2 text-black border rounded outline-0 ${className}`} placeholder={placeholder}/>
        </div>
    )
}