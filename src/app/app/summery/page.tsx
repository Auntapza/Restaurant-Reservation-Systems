'use client'

import dummyFoodImage from "@/img/homepage/dummyPopfood.png"
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Summery() {

    const rotuer = useRouter();
    const param = useSearchParams();

    const TableSelect = param.get('table');
    const time = param.get('time');

    useEffect(() => {
        if (!TableSelect || !time) {
            rotuer.replace('table');
        }
    }, [])

    const CartData = [
        {
            image: dummyFoodImage,
            name: "Pizza",
            price: 150,
            count: 1
        },
        {
            image: dummyFoodImage,
            name: "Pizza",
            price: 150,
            count: 1
        },
    ]

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
                                    {CartData.map((e, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="grid place-items-center">
                                                    <Image src={e.image} alt="" className="w-24 h-24 rounded" />
                                                </td>
                                                <td>{e.name}</td>
                                                <td>{e.price}฿</td>
                                                <td className="text-start">
                                                    <div className='flex gap-x-2 items-center justify-evenly'>
                                                        <span className='text-xl'>{e.count}</span>
                                                    </div>
                                                </td>
                                                <td>{e.price * e.count}฿</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                    onClick={() => {rotuer.push('payment')}}>Purchase Order</button>
                </div>
            </div>
        </>
    )
};
