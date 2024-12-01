'use client'

import TableSelect from "@/component/TableSelect";
import User from "@/img/user";
import Image from "next/image";

import dummyImage from '@/img/homepage/dummyPopfood.png'
import { useRef, WheelEvent } from "react";

export default function Main() {
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
        
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += e.deltaY
        }
        
    }

    return (
        <>
            <div className="grid gap-5">
                <div className="bg-white rounded-xl p-5">
                    <p className="text-3xl">Table Status</p>
                    <TableSelect/> 
                </div>

                <div 
                className="bg-white rounded-xl p-5 overflow-x-hidden w-full">
                    <p className="text-3xl mb-3">Reservation List</p>
                    <div onWheel={handleScroll} ref={scrollContainerRef}
                    className="flex gap-5 transition overflow-x-auto">
                        <OrderList/>
                        <OrderList/>
                        <OrderList/>
                        <OrderList/>
                        <OrderList/>
                        <OrderList/>
                    </div>
                </div>
            </div>
        </>
    )
}

interface ReservationDetail {
    
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
            <div className="p-3 border border-black rounded min-w-max cursor-pointer">
                <div className="flex items-center gap-3">
                    <User/>
                    <p className="text-3xl">Username</p>
                </div>
                <div className="mt-2 text-xl">
                    <h1 className="text-2xl">Order List</h1>
                    <FoodList/>
                    <FoodList/>
                    <p className="mt-5 text-3xl">Total Price : 1000฿</p>
                </div>
            </div>
        </>
    )
}
