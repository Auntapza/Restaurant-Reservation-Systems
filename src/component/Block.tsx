import { HTMLAttributes, ReactNode } from "react";

interface Box extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode; 
}

export default function Block({children, className, ...rest} :Box) {

    return (
        <div className={`bg-white rounded shadow p-5 ${className}`} {...rest}>
            {children}
        </div>
    )
}