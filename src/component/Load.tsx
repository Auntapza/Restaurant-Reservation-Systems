import { ReactNode } from "react";

export default function Loading({ children, loadding, fallback }:{
    children: ReactNode,
    loadding: boolean,
    fallback: JSX.Element
}) {
    
    if (loadding) {
        return fallback
    } else {
        return children
    }

}