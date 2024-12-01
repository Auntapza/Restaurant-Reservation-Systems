import { Home } from "@/img/svg/svg"
import { WorkerType } from "@/interface/interface"
import Link from "next/link"

export default function Sidebar({type} : {
    type: WorkerType
}) {

    let SideMenu = [{
        icon: <Home />
    }]

    // if (type == WorkerType.cashier) {
    //     SideMenu = [
    //         {
    //             icon: 
    //         }
    //     ]
    // }

    return (
        <>
            <div className="bg-white h-screen max-w-24 flex flex-col p-5 sticky top-0">
                <div className="flex flex-col gap-12">
                    <Link href={''} className="group hover:bg-slate-50 rounded-lg transition-colors">
                        <Home/>
                    </Link>
                </div>
            </div>
        </>
    )
}