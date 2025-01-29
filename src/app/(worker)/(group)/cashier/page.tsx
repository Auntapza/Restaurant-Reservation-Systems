'use client'

import TableSelect from "@/component/TableSelect";
import User from "@/img/user";
import Image from "next/image";

import dummyImage from '@/img/homepage/dummyPopfood.png'
import { useRef, useState, MouseEvent, WheelEvent, useEffect } from "react";
import { TableOption } from "./Popup";
import { io } from "socket.io-client";
import api from "@/function/api";

interface ReservationDetail {
    customerName: string,
    foodList: {
        foodName: string,
        foodPrice: number | string,
        foodImg?: string
    }[],
    totalPrice: number | string
}

const socket = io('http://localhost:4000');

export default function Main() {
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [tableTarget, setTabletarget] = useState<string>('');
    const [tableOptionShow, setTableOptionShow] = useState<boolean>(false);
    const [mousePostion, setMousePosition] = useState<{x:number, y:number}>({
        x: 0,
        y: 0
    });
    const [reservationData, setReservationData] = useState<ReservationDetail[]>([])

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
    
    async function getReservationData() {
        const data = await api.get("http://localhost:4000/order/reservation");
        setReservationData(data);
    }

    useEffect(() => {
        socket.on("table update", () => {
            setTableOptionShow(false)
            getReservationData()
        })
    }, [socket])

    useEffect(() => {
        getReservationData()
    }, [])

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
                        {reservationData.map((e, index) => (<OrderList data={e} key={index}/>))}
                    </div>
                </div>
            </div>
        </>
    )
}

const OrderList = ({data} : { data: ReservationDetail }) => {

    const FoodList = ({food} : { 
        food: {
            foodName: string,
            foodPrice: number | string,
            foodImg?: string
        }
    }) => {
        return (
            <>
                <div className="mt-2 flex gap-5 items-center">
                    <Image src={food.foodImg ? food.foodImg : dummyImage} width={100} height={100} alt="" className="w-14 rounded-md"/>
                    <p className="text-xl">{food.foodName}</p>
                    <p>Price : {food.foodPrice}฿</p>
                </div>
            </>
        )
    }
    
    return (
        <>
            <div className="p-3 shadow-[5px_10px_1px_1px_#000] rounded min-w-max cursor-pointer">
                <div className="flex items-center gap-3">
                    <User/>
                    <p className="text-3xl">{data.customerName}</p>
                </div>
                <div className="mt-2 text-xl">
                    <h1 className="text-2xl">Order List</h1>
                    {data.foodList.map((e, index) => (<FoodList food={e} key={index}/>))}
                    <p className="mt-5 text-3xl">Total Price : {data.totalPrice}฿</p>
                </div>
            </div>
        </>
    )
}
