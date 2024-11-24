'use client'

import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation"

export default function FindTable() {

    const router = useRouter();

    const [tableTarget, setTabletarget] = useState<String>('');

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
                    <button onClick={() => {router.back()}} className="flex gap-3 text-4xl items-center w-fit">
                        <Arrow className="size-16" />
                        Back
                    </button>
                    <div className="border border-black p-5 grid grid-rows-2 grid-cols-3
                    justify-items-center mt-5">

                        {/* Table Layout */}
                        <Table selected={tableTarget == 'A01'} onClick={() => {selectTable('A01')}}
                        state={2}/>
                        <Table selected={tableTarget == 'A02'} onClick={() => {selectTable('A02')}}/>
                        <Table selected={tableTarget == 'A03'} onClick={() => {selectTable('A03')}}
                        state={1}/>
                        <Table selected={tableTarget == 'A04'} onClick={() => {selectTable('A04')}}/>
                        <Table selected={tableTarget == 'A05'} onClick={() => {selectTable('A05')}}/>
                        <Table selected={tableTarget == 'A06'} onClick={() => {selectTable('A06')}}/>

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
                    <button className="bg-orange-500 rounded-lg text-white py-4 px-8 2xl:text-3xl disabled:bg-orange-300
                    transition disabled:cursor-default"
                    disabled={tableTarget == ''} onClick={() => {router.push('/app/summery')}}>Purchase Order</button>
                </div>
            </div>
        </>
    )
}

enum State {
    busy = 1,
    ordered = 2
}

import correct from '@/img/correct.png'

function Table( {onClick, state, selected} : {
    onClick?: MouseEventHandler,
    state?: State,
    selected?: boolean
} ) {
    return (
        <>
            <button className="cursor-pointer relative" onClick={onClick} disabled={state == 1 || state == 2}>
                {
                    selected ?
                    (<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                        <Image className="size-20" src={correct} alt=""/>
                    </div>)
                    :
                    ''
                }
                <svg width="256px" height="256px" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" fill={
                    state == 1 ? '#f00' : state == 2 ? '#fa0' : '#000'
                } stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g><g id="SVGRepo_iconCarrier"> <title>table</title> <path d="M18.76,6l2,4H3.24l2-4H18.76M20,4H4L1,10v2H3v7H5V16H19v3h2V12h2V10L20,4ZM5,14V12H19v2Z"></path> <rect width="24" height="24" fill="none"></rect> </g></svg>
            </button>
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