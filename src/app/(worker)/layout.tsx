import Sidebar from "@/component/worker/Sidebar";
import { WorkerType } from "@/interface/interface";
import { LayoutProps } from "../../../.next/types/app/page";

export default function Main({children}:LayoutProps) {
    return (
        <>
            <div className="flex gap-5 bg-slate-200 min-h-screen">
                <Sidebar type={WorkerType.cashier}/>
                <div className="w-full p-4 ps-0">
                    {children}
                </div>
            </div>
        </>
    )
}