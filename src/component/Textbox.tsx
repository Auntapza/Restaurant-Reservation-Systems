import { ChangeEventHandler } from "react"

export default function Textbox({ placeholder,  className, type, onChange } : {
    placeholder?: string,
    className?: string,
    type?: string | 'text',
    onChange?: ChangeEventHandler
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-xl">{placeholder}</label>
            <input required onChange={onChange} type={type} className={`border-gray-500 transition-all duration-300 p-2 text-black border rounded outline-0 ` + className} placeholder={placeholder}/>
        </div>
    )
}