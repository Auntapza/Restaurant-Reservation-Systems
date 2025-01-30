'use client'

import socket from "@/backend/lib/socket";
import api from "@/function/api";
import useFetchData from "@/hooks/useFetch";
import { faUser, faUtensils, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FoodItem {
    food_id: number;
    food_name: string;
    food_price: number;
    food_img: string;
    text: string | null;
    date_create: string;
    cat_id: number;
}

interface OrderDetail {
    order_id: number;
    food_id: number;
    quantity: number;
    complete: string;
    Food: FoodItem;
}

interface Order {
    order_id: number;
    order_date: string;
    service_time: string;
    table_id: string;
    order_status: string;
    modifyTime: string;
    acc_id: number;
    recipt_img: string | null;
    OrderDetail: OrderDetail[];
}

interface PageData {
    totalOrder: number;
    totalClient: number;
    order: Order[];
}


export default function Main() {

    const [dep, setDep] = useState(0);
    const { data, loader } = useFetchData<PageData>({
        url: "http://localhost:4000/waiter/page",
        dependencies: [dep]
    }) 

    useEffect(() => {
        socket.on('order update', () => {
            setDep((prv) => prv + 1)
        })
    }, [])

    const stat = [
        {
            title: "ลูกค้าลูกค้า",
            value: data?.totalClient as number,
            icon: faUser
        },
        {
            title: "ออร์เดอร์เสร็จสิ้น",
            value: data?.totalOrder as number,
            icon: faUtensils
        }
    ]
    
    return (
        <>
            <div className="mb-16">
                <div className="container mx-auto px-4 pt-20 pb-24">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {stat.map((e, index) => <QucikStat key={index} data={e}/>)}
                    </div>
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Order Food */}
                        <Link href={'waiter/table'} className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl flex items-center gap-4 shadow-sm hover:from-yellow-600 hover:to-yellow-700 transition w-full">
                            <div className="bg-yellow-400/30 p-3 rounded-lg">
                                <FontAwesomeIcon icon={faUtensils} className="text-xl"/>
                            </div>
                            <span className="text-lg font-medium">สั่งอาหารให้ลูกค้า</span>
                        </Link>
                    </div>
                </div>
                {/* Active Orders */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-bold">ออเดอร์ที่กำลังดำเนินการ</h2>
                    </div>
                    <div className="divide-y">
                        {data?.order.map((e, index) => <Order data={e} state={setDep} key={index}/>)}
                    </div>
                </div>
            </div>

        </>
    )
}

function QucikStat({data}: {data: {
    title: string,
    value: number | string,
    icon: IconDefinition
}}) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                    <FontAwesomeIcon icon={data.icon} className="text-blue-600"/>
                    <i className="fas fa-users text-blue-600" />
                </div>
                <div>
                    <div className="text-sm text-gray-600">{data.title}</div>
                    <div className="text-xl font-bold">{data.value}</div>
                </div>
            </div>
        </div>
    )
}

function Order({ data, state }: { data: Order, state: Dispatch<SetStateAction<number>> }) {

    async function CompleteTask() {
        const res = api.post('http://localhost:4000/waiter/page/'+data.order_id, {})

        toast.promise(res, {
            loading: 'Loadding....',
            success: (res) => {
                state((prv) => prv + 1)
                return res.msg
            },
            error: (res) => res.msg
        }) 
        
    }
    
    return (
        <div className="p-4">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">Table {data.table_id}</span>
                    </div>
                    <p className="text-sm text-gray-600">Order at {new Date(data.service_time).toString().split(' ')[4]}</p>
                </div>
            </div>
            {/* Order Items */}
            <div className="space-y-2 mb-4">
                {data.OrderDetail.map((e, index) => (
                    <div key={index} className="flex justify-between text-sm">
                        <span>{e.Food.food_name}</span>
                        <span className="text-gray-600">x{e.quantity}</span>
                    </div>
                ))}
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2">
                <button onClick={CompleteTask} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Done!
                </button>
            </div>
        </div>
    )
}