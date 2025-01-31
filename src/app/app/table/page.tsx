'use client'

import { InputHTMLAttributes, LegacyRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"
import TableSelect from "@/component/TableSelect";
import Button from "@/component/Button";
import Arrow from "@/component/Arrow";

export default function FindTable() {

    const router = useRouter();

    const [tableTarget, setTabletarget] = useState('');
    const [timeSelect, setTimeSelect] = useState('')
    const timeInputRef = useRef<any>(null);

    const selectTable = (tableno: string) => {
        if (tableTarget == tableno) {
            setTabletarget('');
        } else {
            setTabletarget(tableno);
        }
    }

    return (
        <>
            <div className="flex justify-center mt-4 min-h-screen">
                <div className="container">
                    <button onClick={() => { router.push('/app') }} className="flex gap-3 text-4xl items-center w-fit">
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
                    <input ref={timeInputRef} type="time" className="border border-black rounded p-3" onChange={(e) => {
                        setTimeSelect(e.target.value);
                    }}/>
                    <Button className="px-8 transition py-4 disabled:bg-orange-300"
                        disabled={(timeSelect == '' || tableTarget == '')} 
                        onClick={() => { router.push(`/app/summery?table=${tableTarget}&time=${timeSelect}`) }}>
                            Purchase Order
                    </Button>
                </div>
            </div>
        </>
    )
}