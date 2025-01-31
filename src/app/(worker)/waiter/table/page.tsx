'use client'

import TableSelect from "@/component/TableSelect";
import { useRouter } from "next/navigation";

export default function Main() {

    const router = useRouter()

    const selectTable = (tableno: string, ev:any, status:number) => {
        if (status == 1) {
            router.push('table/'+tableno)
        }
    }

    return (
        <>
            <div className="min-h-screen flex">
                <TableSelect className="mt-20" selectFunction={selectTable}/>
            </div>
        </>
    )
}