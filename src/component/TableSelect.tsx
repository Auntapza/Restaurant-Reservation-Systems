export default function TableSelect({ tableVal } : {
    tableVal: Dispatch<SetStateAction<String>>
}) {

    const [tableTarget, setTabletarget] = useState<String>('');

    const selectTable = (tableno: string) => {
        if (tableTarget == tableno) {
            setTabletarget('');
        } else {
            setTabletarget(tableno);
            tableVal(tableno)
        }
    }

    return (
        <>
            <div className="grid grid-rows-2 grid-cols-3 w-full justify-items-center">
                <Table selected={tableTarget == 'A01'} onClick={() => {selectTable("A01")}}/> 
                <Table selected={tableTarget == 'A02'} onClick={() => {selectTable("A02")}} state={1}/> 
                <Table selected={tableTarget == 'A03'} onClick={() => {selectTable("A03")}}/> 
                <Table selected={tableTarget == 'A04'} onClick={() => {selectTable("A04")}}/> 
                <Table selected={tableTarget == 'A05'} onClick={() => {selectTable("A05")}} state={2}/> 
                <Table selected={tableTarget == 'A06'} onClick={() => {selectTable("A06")}}/> 
            </div>  
        </>
    )
}

enum State {
    busy = 1,
    ordered = 2
}

import correct from '@/img/correct.png'
import Image from 'next/image'
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react'

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