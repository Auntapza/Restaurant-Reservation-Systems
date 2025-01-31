'use client'

import socket from "@/lib/socket";
import Block from "@/component/Block";
import Button from "@/component/Button";
import api from "@/function/api";
import useFetchData from "@/hooks/useFetch";
import dummyImage from "@/img/homepage/dummyPopfood.png"
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState, WheelEvent } from "react";
import toast from "react-hot-toast";

interface MenuList {
    order_id: string | number,
    table: string,
    time: string
    foodList: {
        foodId: string | number,
        foodImgUrl?: string
        foodName: string,
        foodQuantity: number
    }[]
}

export default function Main() {

    const Scrollbox = useRef<HTMLDivElement>(null);
    const [dep, setDep] = useState<number>(0);

    function scroll(e: WheelEvent<HTMLDivElement>) {
        if (Scrollbox.current) {
            Scrollbox.current.scrollLeft += e.deltaY
        }
    }

    const { data, loader } = useFetchData<MenuList[]>({
        url: "http://localhost:4000/chef",
        dependencies: [dep]
    })

    useEffect(() => {
        socket.on("order update", () => {
            setDep((prv) => prv + 1);
        })
    }, [])
    
    return (
        <>
            <Block className="h-full gap-5 flex flex-col w-full overflow-x-hidden">
                <h1 className="text-4xl self-start">Chef menu</h1>
                <div className="grid h-full">
                    <div className="flex gap-x-5 h-full overflow-x-auto" onWheel={scroll} ref={Scrollbox}>
                        {data == undefined || data.length < 1 ? 
                        (<p className="text-center text-3xl mt-6 w-full text-slate-300">Not Found Task</p>):
                        data?.map((e, index) => (<MenuList data={e} state={setDep} key={index}/>))}
                    </div>
                </div>
            </Block>
        </>
    )
};

const MenuList = ({data, state} : {data: MenuList, state: Dispatch<SetStateAction<number>>}) => {

    const count = data.foodList.length;
    const [checkState, setCheckState] = useState<boolean[]>(
        new Array(count).fill(false)
    )

    function checked(index:number) {
        const updateState = [...checkState];
        updateState[index] = !updateState[index];
        setCheckState(updateState);
    }

    function sendComplete(orderId: number | string) {
        const res = api.put("http://localhost:4000/chef/"+String(orderId), {});
        toast.promise(res, {
            loading: "Loadding....",
            success: (res) => {
                state((prv) => prv + 1)
                return res.msg
            },
            error: (err) => err.message
        })
    }

    const isCheck = checkState.every(Boolean);

    return (
        <>
            <div className="bg-slate-100 rounded p-5 shadow h-full min-w-max">
                <h1 className="text-3xl font-bold">Order : {data.order_id}</h1>
                <h1 className="text-3xl font-bold">Table : {data.table}</h1>
                <h1 className="text-xl mt-5">Service time : {new Date(data.time).toString().split(' ')[4].slice(0, 5)}</h1>
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
                    <Button className="mt-5 ms-auto block" disabled={!isCheck} onClick={() => {sendComplete(data.order_id)}}>Complete</Button>
                </div>
            </div>
        </>
    )
}