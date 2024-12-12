'use client'

import TableSelect from "@/component/TableSelect";
import User from "@/img/user";
import Image from "next/image";

import dummyImage from '@/img/homepage/dummyPopfood.png'
import { useRef, useState, MouseEvent, WheelEvent } from "react";
import { TableOption } from "./Popup";

interface ReservationDetail {
    cusName: string,
    foodList: {
        name: string,
        price: number | string,
    }[],
    totalPrice: number | string
}

export default function Main() {
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [tableTarget, setTabletarget] = useState<string>('');
    const [tableOptionShow, setTableOptionShow] = useState<boolean>(false);
    const [mousePostion, setMousePosition] = useState<{x:number, y:number}>({
        x: 0,
        y: 0
    });

    const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
        
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += e.deltaY
        }
        
    }

    const selectTable = (tableno: string, e:MouseEvent<HTMLButtonElement>) => {
        setTabletarget(tableno);
        setTableOptionShow(true);
        setMousePosition({
            x: Number(e.clientX),
            y: Number(e.clientY)
        })
    }

    const closeTableOption = () => {
        setTabletarget('');
        setTableOptionShow(false);
        setMousePosition({
            x: Number(0),
            y: Number(0)
        })
    }

    return (
        <>
            <TableOption position={mousePostion} tableno={tableTarget} isOpen={tableOptionShow} close={closeTableOption}/>
            <div className="grid gap-5">
                <div className="bg-white rounded-xl p-5">
                    <p className="text-3xl">Table Status</p>
                    <TableSelect selectFunction={selectTable}/>
                </div>

                <div 
                className="bg-white rounded-xl p-5 overflow-x-hidden w-full">
                    <p className="text-3xl mb-3">Reservation List</p>
                    <div onWheel={handleScroll} ref={scrollContainerRef}
                    className="flex gap-5 transition overflow-x-auto p-3">
                        {Array.from({length: 10}).map((e, index) => (<OrderList key={index}/>))}
                    </div>
                </div>
            </div>
        </>
    )
}

const OrderList = () => {

    const FoodList = () => {
        return (
            <>
                <div className="mt-2 flex gap-5 items-center">
                    <Image src={dummyImage} alt="" className="w-14 rounded-md"/>
                    <p className="text-xl">Food name</p>
                    <p>Price : 50฿</p>
                </div>
            </>
        )
    }
    
    return (
        <>
            <div className="p-3 shadow-[5px_10px_1px_1px_#000] rounded min-w-max cursor-pointer">
                <div className="flex items-center gap-3">
                    <User/>
                    <p className="text-3xl">Username</p>
                </div>
                <div className="mt-2 text-xl">
                    <h1 className="text-2xl">Order List</h1>
                    {Array.from({length: 4}).map((e, index) => (<FoodList key={index}/>))}
                    <p className="mt-5 text-3xl">Total Price : 1000฿</p>
                </div>
            </div>
        </>
    )
}
