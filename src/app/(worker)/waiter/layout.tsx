'use client'

import { faHome, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutProps } from "../../../../.next/types/app/layout";
import logo from "@/img/Logo.png"
import Image from "next/image";

export default function Layout({children}: LayoutProps) {
    return (
        <>
            <nav className="w-full fixed top-0 z-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Title and User */}
                        <div className="flex items-center gap-4">
                            <Image src={logo} className="h-10 w-auto" alt=""/>
                        </div>
                        <div className="bg-orange-500/30 px-3 py-1 rounded-full flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-sm">สมชาย</span>
                        </div>
                    </div>
                </div>
            </nav>

            {children}

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3 p-2">
                        <button className="flex flex-col items-center p-2 text-blue-600 hover:text-blue-800">
                            <FontAwesomeIcon icon={faHome} className="text-xl mb-1"/>
                            <span className="text-xs">Main Page</span>
                        </button>
                        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-800">
                            <FontAwesomeIcon icon={faUtensils} className="text-xl mb-1"/>
                            <span className="text-xs">Order menu</span>
                        </button>
                        <button className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-800">
                            <FontAwesomeIcon icon={faUser} className="text-xl mb-1"/>
                            <span className="text-xs">Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}