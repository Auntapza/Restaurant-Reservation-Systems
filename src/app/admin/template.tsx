'use client'

import { usePathname } from "next/navigation";
import { LayoutProps } from "../../../.next/types/app/layout";

export default function AdminTemplate({children} : LayoutProps) {

    const pathname = usePathname()

    let title = ''

    if (pathname === '/admin') {
        title = 'Dashbord';
    } else if (pathname.startsWith('/admin/account', 0)){
        title = 'Account Management';
    } else if (pathname.startsWith('/admin/food', 0)) {
        title = 'Food Management';
    }
    
    return (
        <>
            <div className="bg-white p-5 rounded-lg shadow text-4xl">
                <p>Admin - {title}</p>
            </div>       
            <div className="mt-5">{children}</div>
        </>
    )
}