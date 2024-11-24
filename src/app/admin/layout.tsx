'use client'

import Image from "next/image"

import Logo from "@/img/Logo.png"
import Link from "next/link"
import Dashbord from "@/img/dashbord"
import { usePathname } from "next/navigation"
import User from "@/img/user"
import Cake from "@/img/cake"
import { LayoutProps } from "../../../.next/types/app/layout"

export default function AdminLayout({children} : LayoutProps) {

    const pathname = usePathname();

    const linkData = [
        {
            link: '/admin',
            text: 'Dashbord',
            image: <Dashbord/>
        },
        {
            link: '/admin/account',
            text: 'account',
            image: <User/>
        },
        {
            link: '/admin/food',
            text: 'Food management',
            image: <Cake/>
        },
    ]

    ////////////////////// sidebar Component //////////////////////
    const SidebarLink = ({data} : {
        data :{
            link: string,
            text: string,
            image: JSX.Element
        }
    }) => {
        return (
            <>
                <Link href={data.link} className={`group flex items-center gap-5 ${pathname == data.link ? 'active' : ''}`}>
                    {data.image}
                    <p className="text-xl capitalize group-hover:text-orange-500 transition">{data.text}</p>
                </Link>
            </>
        )
    }

    return (
        <>
            <div className="h-full flex">
                {/* Side bar */}
                <div className="p-8 top-0 min-h-screen w-1/4 sticky shadow-xl">
                    <div className="sticky top-8">
                        <Image alt="" src={Logo} className="w-52"/>
                        {/* Menu button */}
                        <div className="flex flex-col mt-8 gap-6 w-full">
                            {linkData.map((e, index) => <SidebarLink key={index} data={e}/>)}
                        </div>
                    </div>
                </div>
                <div className="bg-slate-100 min-h-screen w-full p-8">
                    {children}
                </div>
            </div>
        </>
    )
}