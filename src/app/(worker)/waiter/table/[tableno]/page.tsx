'use client'

import api from "@/function/api";
import useFetchData from "@/hooks/useFetch"
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Food {
    cat_id: number;
    date_create: string;
    food_id: number;
    food_img: string;
    food_name: string;
    food_price: number;
    text: string | null;
  }  

export default function Main() {

    const { data, loader } = useFetchData<Food[]>({
        url: 'http://localhost:4000/waiter/order'
    })
    const router = useRouter();
    const { tableno } = useParams();

    useEffect(() => {
        let foodQuantity = {};
        data?.forEach(e => {
            foodQuantity = {
                ...foodQuantity,
                [e.food_id]: 0
            }
        })
        setFood(foodQuantity)
    }, [data])

    const [food, setFood] = useState<Record<string, number>>({})

    async function placeOrder() {
        const res = api.post('http://localhost:4000/waiter/order/'+tableno, food);
        
        toast.promise(res, {
            loading: "Loadding...",
            success: (res) => {
                router.push('/waiter')
                return res.msg
            },
            error: (res) => res.msg
        })
    }
    
    function FoodCard({ data, state }: { data: Food, state: Dispatch<SetStateAction<Record<string, number>>> }) {

        return (
            <div className="menu-item bg-white rounded-lg shadow transition duration-300 ease-in-out">
                <Image src={data.food_img} width={500} height={500} className="w-full h-32 object-cover rounded-t-lg mb-4" alt=""/>
                <div className="p-4 pt-0">
                    <h3 className="text-xl font-medium">{data.food_name}</h3>
                    <p className="text-orange-500 font-bold mt-2">฿{data.food_price}</p>
                    <div className="flex items-center mt-4">
                        <button className="quantity-btn minus bg-gray-200 px-3 py-1 rounded-l" onClick={() => {
                            state((prv) => ({
                                ...prv,
                                [data.food_id]: prv[data.food_id]--
                            }))
                        }}>-</button>
                        <input type="number" className="w-16 text-center border-y border-gray-200" defaultValue={food[data.food_id]} min={0} />
                        <button className="quantity-btn plus bg-gray-200 px-3 py-1 rounded-r" onClick={() => {
                            state((prv) => ({
                                ...prv,
                                [data.food_id]: prv[data.food_id]++
                            }))
                        }}>+</button>
                    </div>
                </div>
            </div>
        )
    }

    function FoodList({data}: {data: Food}) {
        return (
            <div className="flex justify-between">
                <p>{data.food_name}</p>
                <p>x{food[data.food_id]}</p>
            </div>
        )
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div id="menuSection">
                <h2 className="text-2xl font-semibold mb-6">Select Menu</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Menu Items */}
                    {data?.map((e, index) => <FoodCard state={setFood} data={e} key={index}/>)}
                </div>
                <div className="mt-8 mb-24">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-lg font-semibold mb-4">รายการสั่งซื้อ</h3>
                        <div id="currentOrderItems" className="mb-4">
                            {/* Current order items will be displayed here */}
                            {data?.map((e, index) => {
                                if (food[e.food_id] < 1) {
                                    return ''
                                } else {
                                    return <FoodList data={e} key={index}/>
                                }
                            })}
                        </div>
                        <div className="flex justify-between items-center font-bold">
                            <span>Total:</span>
                            <span className="text-orange-500" id="currentTotal">฿{data?.reduce((sum, e) => {
                                return sum + eval(`${e.food_price * food[e.food_id]}`)
                            }, 0)}</span>
                        </div>
                        {/* Single Confirm Order Button */}
                        <button id="submitOrder" onClick={placeOrder} className="w-full bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-600 focus:outline-none">
                            Place order
                        </button>
                    </div>
                </div>
            </div>
        </main>

    )
}