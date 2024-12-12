'use client'

import { Home } from "@/img/svg/svg"
import { WorkerType } from "@/interface/interface"
import Link from "next/link"
import { Logout } from "../Menubar"

export default function Sidebar({type} : {
    type: WorkerType
}) {

    let SideMenu:{
        icon: JSX.Element,
        link: string
    }[] = []

    if (type == WorkerType.cashier) {
        SideMenu = [
            {
                icon: <Home/>,
                link: '/cashier'
            }
        ]
    }

    function logout() {
        /// logout function code...
    }

    return (
        <>
            <div className="bg-white h-screen max-w-24 flex flex-col p-5 items-center sticky top-0">
                <div className="flex flex-col gap-12 grow">
                        {SideMenu.map((e, index) => (
                            <Link href={e.link} className="group hover:bg-slate-50 rounded-lg transition-colors" key={index}>
                                <div>
                                    {e.icon}
                                </div>
                            </Link>
                        ))}
                </div>
                <div>
                    <button onClick={() => {logout}} className="group -translate-x-1 hover:bg-slate-50 p-2 transition rounded">
                        <Logout />
                    </button>
                </div>
            </div>
        </>
    )
}