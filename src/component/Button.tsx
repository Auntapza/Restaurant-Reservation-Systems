import React, { MouseEventHandler, ReactNode } from "react";

export default function Button( { children, onClick } :{
    children: ReactNode,
    onClick?: MouseEventHandler
} ) {

    return (
        <>
            <button className='rounded text-2xl bg-orange-500 text-white shadow text-bold p-2' onClick={onClick}>
                {children}
            </button>
        </>
    )
    
}