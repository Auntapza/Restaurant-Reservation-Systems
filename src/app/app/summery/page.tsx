import dummyFoodImage from "@/img/homepage/dummyPopfood.png"
import Image from 'next/image';

export default function Summery() {

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
        {
            image: dummyFoodImage,
            name: "Pizza",
            price: 150,
            count: 1
        },
    ]

    const TableSelect = 'A02'

    return (
        <>
            <div className="flex justify-center">
                <div className="container grid justify-between gap-4">

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

                    {/* Price Detail */}
                    <div className="mb-7">
                        <p className="text-5xl my-5">Price Detail</p>
                        <div className="border border-black rounded p-4">
                            <div className="flex justify-between">
                                <p className="text-4xl">Reservation Fee</p>
                                <p className="text-4xl font-bold">20฿</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div />
                <div />
            </div>
            <div className="sticky bottom-0 w-full flex justify-center bg-white
            border shadow-[0_-4px_4px_0_#00000055] py-7 rounded-t-xl">
                <div className="container flex justify-between items-center">
                    <p className="text-6xl">
                        Table : <b>{TableSelect}</b>
                    </p>
                    <p className="font-bold text-2xl">Date : {`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}</p>
                    <select name="" id="" className="border border-black p-3 py-2 rounded-lg text-3xl">
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                        <option value="" className="checked:text-orange-500 hover:text-orange-500">9:00 AM - 10:00 AM</option>
                    </select>
                    <button className="bg-orange-500 rounded-lg text-white py-4 px-8 2xl:text-3xl xl:text-2xl disabled:bg-orange-300
                    transition disabled:cursor-default"
                    >Purchase Order</button>
                </div>
            </div>
        </>
    )
};
