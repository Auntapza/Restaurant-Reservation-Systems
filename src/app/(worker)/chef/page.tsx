'use client'

import Block from "@/component/Block";
import Button from "@/component/Button";
import dummyImage from "@/img/homepage/dummyPopfood.png"
import Image from "next/image";
import { useRef, useState, WheelEvent } from "react";

interface MenuList {
    order_id: string | number,
    table: string,
    foodList: {
        foodId: string | number,
        foodImgUrl?: string
        foodName: string,
        foodQuantity: number
    }[]
}

// dummydata
const data: MenuList[] = [
    {
        order_id: "ORD001",
        table: "A1",
        foodList: [
            { foodId: "F001", foodName: "Pasta Carbonara", foodQuantity: 2 },
            { foodId: "F002", foodName: "Caesar Salad", foodQuantity: 1 },
        ]
    },
    {
        order_id: "ORD002",
        table: "A3",
        foodList: [
            { foodId: "F003", foodName: "Margherita Pizza", foodQuantity: 1 },
            { foodId: "F004", foodName: "Garlic Bread", foodQuantity: 3 },
        ]
    },
    {
        order_id: "ORD003",
        table: "A2",
        foodList: [
            { foodId: "F005", foodName: "Grilled Chicken", foodQuantity: 2 },
            { foodId: "F006", foodName: "French Fries", foodQuantity: 1 },
        ]
    },
    {
        order_id: "ORD004",
        table: "A4",
        foodList: [
            { foodId: "F007", foodName: "Tiramisu", foodQuantity: 2 },
            { foodId: "F008", foodName: "Espresso", foodQuantity: 1 },
        ]
    },
    {
        order_id: "ORD005",
        table: "A5",
        foodList: [
            { foodId: "F009", foodName: "Cheeseburger", foodQuantity: 3 },
            { foodId: "F010", foodName: "Lemonade", foodQuantity: 2 },
        ]
    }
];


export default function Main() {

    const Scrollbox = useRef<HTMLDivElement>(null);

    function scroll(e: WheelEvent<HTMLDivElement>) {
        if (Scrollbox.current) {
            Scrollbox.current.scrollLeft += e.deltaY
        }
    }
    
    return (
        <>
            <Block className="h-full gap-5 flex flex-col w-full overflow-x-hidden">
                <h1 className="text-4xl self-start">Chef menu</h1>
                <div className="grid h-full">
                    <div className="flex gap-x-5 h-full overflow-x-auto" onWheel={scroll} ref={Scrollbox}>
                        {data.map((e, index) => (<MenuList data={e} key={index}/>))}
                    </div>
                </div>
            </Block>
        </>
    )
};

const MenuList = ({data} : {data: MenuList}) => {

    const count = data.foodList.length;
    const [checkState, setCheckState] = useState<boolean[]>(
        new Array(count).fill(false)
    )

    function checked(index:number) {
        const updateState = [...checkState];
        updateState[index] = !updateState[index];
        setCheckState(updateState);
    }

    const isCheck = checkState.every(Boolean);

    return (
        <>
            <div className="bg-slate-100 rounded p-5 shadow h-full min-w-max">
                <h1 className="text-3xl font-bold">Order : {data.order_id}</h1>
                <h1 className="text-3xl font-bold">Table : {data.table}</h1>
                <div className="mt-5">
                    <table className="rounded-lg overflow-hidden border border-black">
                        <thead className="text-xl bg-orange-200">
                            <tr>
                                <th className="px-5 py-3"></th>
                                <th className="px-5 py-3">Food Image</th>
                                <th className="px-5 py-3">Food Name</th>
                                <th className="px-5 py-3">Food Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-xl bg-orange-100">
                            {data.foodList.map((e, index) => {
                                return (
                                    <tr key={index} className="border-b border-black">
                                        <td className="pt-4">
                                            <input type="checkbox" className="size-5" onChange={() => {checked(index)}}/>
                                        </td>
                                        <td className="pt-4">
                                            <Image src={dummyImage} alt="" className="size-10 mx-auto rounded m-1"/>
                                        </td>
                                        <td className="pt-4">{e.foodName}</td>
                                        <td className="pt-4">{e.foodQuantity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Button className="mt-5 ms-auto block" disabled={!isCheck}>Complete</Button>
                </div>
            </div>
        </>
    )
}