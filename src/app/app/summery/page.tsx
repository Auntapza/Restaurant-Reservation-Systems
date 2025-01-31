'use client'

import cart from "@/function/cart";
import { useOrder } from "@/hooks/order";
import { cartData, orderDetail } from "@/interface/interface";
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Summery() {

    const rotuer = useRouter();
    const param = useSearchParams();

    const router = useRouter();

    const TableSelect = param.get('table');
    const time = param.get('time');
    const { order, setOrder } = useOrder();

    const [cartItem, setCartItem] = useState<cartData[]>([]);

    async function getCratData() {
        const data = await cart.get();
        setCartItem(data)
    }

    useEffect(() => {
        if (!TableSelect || !time) {
            rotuer.replace('table');
        }


        getCratData();

    }, [])

    function makeOrderPayload() {
        const data:orderDetail = {
            tableId: TableSelect as string,
            orderTime: time as string,
            foodList: cartItem,
            accId: cart.userId,
            orderId: 1,
            orderDate: String(new Date())
        }

        setOrder(data);

        router.push('payment')

    }

    return (
        <>
            <div className="flex justify-center">
                <div className="container flex justify-between gap-4">

                    {/* Cart */}
                    <div>
                        <p className="text-5xl my-5">Cart</p>
                        <div className="border border-black rounded-md p-5 w-full xl:max-h-[440px] overflow-auto">
                            <table className="table-fixed w-full text-2xl">
                                <thead className="text-xl">
                                    <tr>
                                        <th>Image</th>
                                        <th>Food name</th>
                                        <th>Price</th>
                                        <th>Count</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {cartItem.map((e, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="grid place-items-center">
                                                    <Image width={100} height={100} src={e.foodImg} alt="" className="w-24 h-24 rounded" />
                                                </td>
                                                <td>{e.foodName}</td>
                                                <td>{e.foodPrice}฿</td>
                                                <td className="text-start">
                                                    <div className='flex gap-x-2 items-center justify-evenly'>
                                                        <span className='text-xl'>{e.quantity}</span>
                                                    </div>
                                                </td>
                                                <td>{e.foodPrice * e.quantity}฿</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">

                <p className="text-red-500 text-lg font-bold">Note : Customers are required to pay for the food after receiving the service. 
                    A reservation fee of 20 THB will be charged to confirm the booking.</p>
                <p className="text-xl mt-3">Reservation Fee: 20฿</p>
            </div>
            <div className="fixed bottom-0 w-full flex justify-center bg-white
            border-t shadow-[0_-4px_4px_0_#00000055] py-7 rounded-t-xl mt-6">
                <div className="container flex justify-between items-center">
                    <p className="text-6xl">
                        Table : <b>{TableSelect}</b>
                    </p>
                    <p className="font-bold text-2xl">Date : {`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}</p>
                    <p className="font-bold text-2xl">Time: {time}</p>
                    <button className="bg-orange-500 rounded-lg text-white py-4 px-8 2xl:text-3xl xl:text-2xl disabled:bg-orange-300
                    transition disabled:cursor-default"
                    onClick={makeOrderPayload}>Purchase Order</button>
                </div>
            </div>
        </>
    )
};
