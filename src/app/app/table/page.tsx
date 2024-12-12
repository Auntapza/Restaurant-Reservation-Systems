'use client'

import { useState } from "react";
import { useRouter } from "next/navigation"
import TableSelect from "@/component/TableSelect";
import Button from "@/component/Button";

export default function FindTable() {

    const router = useRouter();

    const [tableTarget, setTabletarget] = useState<string>('');

    const selectTable = (tableno: string) => {
        if (tableTarget == tableno) {
            setTabletarget('');
        } else {
            setTabletarget(tableno);
        }
    }

    return (
        <>
            <div className="flex justify-center mt-4">
                <div className="container">
                    <button onClick={() => { router.back() }} className="flex gap-3 text-4xl items-center w-fit">
                        <Arrow className="size-16" />
                        Back
                    </button>
                    <div className="border rounded border-black">
                        <TableSelect tableVal={tableTarget} selectFunction={selectTable} />
                    </div>
                </div>
            </div>

            {/* Detail section */}
            <div className="bg-white mt-6 sticky bottom-0 w-full flex justify-center
            border shadow-[0_-4px_4px_0_#00000055] py-7 rounded-t-xl">
                <div className="container flex justify-between items-center">
                    <p className="text-6xl">
                        Table : <b>{tableTarget == '' ? 'None' : tableTarget}</b>
                    </p>
                    <p className="font-bold text-2xl">Date : {`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}</p>
                    <select name="" id="" className="border border-black p-3 py-2 rounded-lg text-3xl">
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                    </select>
                    <Button className="px-8 transition py-4 disabled:bg-orange-300"
                        disabled={tableTarget == ''} onClick={() => { router.push('/app/summery') }}>
                            Purchase Order
                    </Button>
                </div>
            </div>
        </>
    )
}

export function Arrow({ className }: {
    className: string
}) {
    return (
        <>
            <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L4.64645 11.6464L4.29289 12L4.64645 12.3536L5 12ZM17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5V12.5ZM8.64645 7.64645L4.64645 11.6464L5.35355 12.3536L9.35355 8.35355L8.64645 7.64645ZM4.64645 12.3536L8.64645 16.3536L9.35355 15.6464L5.35355 11.6464L4.64645 12.3536ZM5 12.5H17V11.5H5V12.5Z" fill="#222222" />
            </svg>
        </>
    )
}