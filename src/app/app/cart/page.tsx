'use client'

import Image from "next/image";

import { useRouter } from "next/navigation";
import Button from "@/component/Button";
import { useEffect, useState } from "react";
import { cartData } from "@/interface/interface";
import cart from "@/function/cart"

export default function Cart() {
    
    const router = useRouter();
    const [cartItem, setCart] = useState<cartData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0)
    
    async function getCartData() {
        const data = await cart.get();
        setCart(cart.cartList);

        let sum = 0
        if (data.length > 0) {
            data.map(e => {
                sum += (e.foodPrice * e.quantity);
                setTotalPrice(sum);
            })
        } else {
            setTotalPrice(sum);
        }
        return data
    }

    useEffect(() => {
        getCartData();
    }, [0])

    async function editQuantity(o:string, quantity:number, foodId:number) {
        if ((!(quantity == 1) && o === '-') || ((o === '+') && (quantity < 10))) {
            await cart.update(foodId, await eval(`${quantity}${o}1`))
            setCart(await getCartData());
        } else {
            if ((quantity == 1) && o === '-') {
                const res = confirm('Do you want to remove this food?');
                if (res) {
                    cart.remove(foodId);
                    setCart(await getCartData());
                }
            }
        }
    }
    
    return (
        <div className="flex justify-center">
            <div className="container mt-5">
                <h1 className="text-6xl">Your Shopping Cart</h1>
                <div className="flex justify-between w-full gap-4 mt-5">
                    <div className="border border-black rounded-md p-5 w-full">
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
                                {cartItem.length > 0 ? cartItem.map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="grid place-items-center">
                                                <Image width={50} height={50} src={e.foodImg} alt="" className="w-24 h-24 rounded"/>
                                            </td>
                                            <td>{e.foodName}</td>
                                            <td>{e.foodPrice}฿</td>
                                            <td className="text-start">
                                                <div className='flex gap-x-2 items-center justify-evenly'>
                                                    <div onClick={() => {editQuantity('-', e.quantity, e.foodId)}} className='hover:text-orange-500 transition cursor-pointer 
                                                    rounded-full px-4 pb-2 text-3xl shadow'>
                                                        <span>-</span>
                                                    </div>
                                                    <span className='text-xl'>{e.quantity}</span>
                                                    <div onClick={() => {editQuantity('+', e.quantity, e.foodId)}} className='hover:text-orange-500 transition cursor-pointer 
                                                    rounded-full px-3 pb-2 text-3xl shadow'>
                                                        <span>+</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{e.foodPrice * e.quantity}฿</td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan={5} className="pt-5 text-slate-400">No menu in this cart</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-black rounded-md p-5 w-3/4">
                        <h1 className="text-2xl font-bold">Order Summery</h1>
                        <div className="w-full h-[2px] bg-black mt-8"></div>
                        <div className="flex items-center justify-between px-5">
                            <p className="text-gray-500 text-4xl font-bold mt-5 w-fit">Total</p>
                            <p className="text-gray-500 text-4xl font-bold mt-5 w-fit">{totalPrice}฿</p>
                        </div>
                        <Button className="w-full mt-5" onClick={() => {router.push('/app/table')}}>Find Table</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}