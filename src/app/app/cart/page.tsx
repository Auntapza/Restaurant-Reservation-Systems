import Image from "next/image";

import dummyFoodImage from "@/img/homepage/dummyPopfood.png"
import Button from "@/component/Button";

export default function Cart() {

    // Cart Data
    const CartData = [
        {
            image: dummyFoodImage,
            name: "Pizza",
            price: 150,
            count: 1
        },
    ]
    
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
                                {CartData.map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="grid place-items-center">
                                                <Image src={e.image} alt="" className="w-24 h-24 rounded"/>
                                            </td>
                                            <td>{e.name}</td>
                                            <td>{e.price}฿</td>
                                            <td className="text-start">
                                                <div className='flex gap-x-2 items-center justify-evenly'>
                                                    <div className='hover:text-orange-500 transition cursor-pointer 
                                                    rounded-full px-4 pb-2 text-3xl shadow'>
                                                        <span>-</span>
                                                    </div>
                                                    <span className='text-xl'>{e.count}</span>
                                                    <div className='hover:text-orange-500 transition cursor-pointer 
                                                    rounded-full px-3 pb-2 text-3xl shadow'>
                                                        <span>+</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{e.price * e.count}฿</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-black rounded-md p-5 w-3/4">
                        <h1 className="text-2xl font-bold">Order Summery</h1>
                        <div className="w-full h-[2px] bg-black mt-8"></div>
                        <div className="flex items-center justify-between px-5">
                            <p className="text-gray-500 text-4xl font-bold mt-5 w-fit">Total</p>
                            <p className="text-gray-500 text-4xl font-bold mt-5 w-fit">150฿</p>
                        </div>
                        <button className="bg-orange-500 p-4 py-2 rounded text-white text-2xl
                        w-full shadow mt-6 mx-auto justify-self-end">Find Table</button>
                    </div>
                </div>
            </div>
        </div>
    )
}