'use client'

import { faHome, faSignOut, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutProps } from "../../../../.next/types/app/layout";
import logo from "@/img/Logo.png"
import Image from "next/image";
import Link from "next/link";
import useFetchData from "@/hooks/useFetch";
import Logout from "@/function/logout";

interface Fname {
    fullname: string
}

export default function Layout({children}: LayoutProps) {

    const { data, loader } = useFetchData<Fname>({
        url: "http://localhost:4000/waiter/page/username"
    })

    return (
        <>
            <nav className="w-full bg-white fixed top-0 z-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Title and User */}
                        <div className="flex items-center gap-4">
                            <Image src={logo} className="h-10 w-auto" alt=""/>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="bg-orange-500/30 px-3 py-1 rounded-full flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                <span className="text-sm">{data?.fullname}</span>
                            </div>
                            <FontAwesomeIcon icon={faSignOut} className="text-xl text-red-500 cursor-pointer" onClick={() => Logout()}/>
                        </div>
                    </div>
                </div>
            </nav>

            {children}

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
                <div className="container mx-auto">
                    <div className="flex justify-evenly p-2">
                        <Link href={'/waiter'} className="flex flex-col items-center p-2 text-blue-600 hover:text-blue-800">
                            <FontAwesomeIcon icon={faHome} className="text-xl mb-1"/>
                            <span className="text-xs">Main Page</span>
                        </Link>
                        <Link href={'/waiter/table'} className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-800">
                            <FontAwesomeIcon icon={faUtensils} className="text-xl mb-1"/>
                            <span className="text-xs">Order menu</span>
                        </Link>
                        {/* <Link href={'/waiter/profile'} className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-800">
                            <FontAwesomeIcon icon={faUser} className="text-xl mb-1"/>
                            <span className="text-xs">Profile</span>
                        </Link> */}
                    </div>
                </div>
            </div>
        </>
    )
}