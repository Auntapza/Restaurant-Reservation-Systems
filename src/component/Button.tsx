import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode,
    // disabled?: boolean
}

export default function Button( { children, onClick, className, ...rest } :ButtonInterface ) {

    return (
        <>
            <button className={`${className} disabled:bg-orange-300 cursor-pointer disabled:cursor-default transition 
            rounded-lg text-2xl bg-orange-500 text-white shadow text-bold p-2`}
             onClick={onClick} 
             {...rest} >
                {children}
            </button>
        </>
    )
    
}