'use client'

import { Dish } from "@/img/svg/svg";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

import dummyImage from '@/img/homepage/dummyPopfood.png'
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

interface pageData {
    foodList: {
        foodId: number
        foodImg?: string
        foodPrice: number
        foodName: string,
        catId: number
    }[],
    category: {
        catId: number,
        catName: string
    }[]
}

export default function Foodmanagement() {

    const router = useRouter();
    const [data, setData] = useState<pageData>();
    const [show, setShow] = useState([]);

    const showFoodbyCat = (e:ChangeEvent<HTMLSelectElement>) => {

        const val = Number(e.target.value);

        const food = data?.foodList.map(e => {
            if (val == 0) {
                return e
            } else {
                if (e.catId == val) {
                    return e
                }
            }
        })

        setShow(food?.filter(e => e != undefined) as any);
        console.log(food?.filter(e => e != undefined));

    }

    useEffect(() => {
        fetch('http://localhost:4000/admin/food').then(res => res.json())
        .then(res => {setData(res);setShow(res.foodList)})
    }, [])

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="p-2 flex gap-5 items-center">
                    <p className="text-2xl">Food</p>
                    <button onClick={() => {router.push('food/add')}} className="bg-orange-500 shadow text-white p-2 rounded flex gap-3">
                        <Dish/>
                        <p>Add food</p>
                    </button>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-3xl font-bold">Category : </p>
                    <select name="" id="" className="rounded shadow w-2/3 p-2 text-2xl" onChange={showFoodbyCat}>
                        <option value="0">All</option>
                        <option value="3">Main Course</option>
                        <option value="2">Snack</option>
                        <option value="1">Drink</option>
                    </select>
                </div>
            </div>
            <p className="text-4xl mt-5">All menu</p>
            <div className="mt-3 bg-white rounded-lg shadows size-full grid grid-cols-4 p-5 gap-4">
                {show?.map((e, index) => <FoodCard data={e} key={index}/>)}
            </div>
        </>
    )
}

const FoodCard = ({ data }: {
    data: {
        foodName: string,
        foodPrice: number,
        foodId: number,
        foodImg?: string
    }
}) => {
    return (
        <div className="border border-black rounded shadow overflow-hidden">
            <Image src={data.foodImg ? data.foodImg : dummyImage} width={1000} height={1000} alt="" className="w-full object-cover h-52"/>
            <div className="mt-2 p-5">
                <p className="text-2xl">{data.foodName}</p>
                <p className="text-2xl">Price : {data.foodPrice}฿</p>
            </div>
            <div className="grid grid-cols-2 px-3 my-6 gap-3">
                <Link href={`./food/edit?id=${data.foodId}`} className="bg-white text-orange-500 border-2 border-orange-500 hover:text-white
                hover:bg-orange-500 text-3xl transition-all text-center rounded p-2">Edit</Link>
                <button className="bg-red-600 text-white text-3xl transition-all rounded p-2">Delete</button>
            </div>
        </div>
    )
}