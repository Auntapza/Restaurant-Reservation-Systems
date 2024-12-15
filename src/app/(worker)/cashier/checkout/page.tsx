'use client'

import dummyImage from '@/img/homepage/dummyPopfood.png'
import Image from "next/image"
import wallet from "@/img/payment/truewalletLogo.png";
import promptpay from "@/img/payment/PromptpayLogo.png";
import Link from 'next/link';
import Arrow from '@/component/Arrow';
import { Payment } from '../Popup';
import { ChangeEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Main() {

    const data = {
        food: 200,
        drink: 200
    }

    const [totalPrice, setTotalPrice] = useState<number>(data.food + data.drink);
    const param = useSearchParams();
    const method = param.get('m');
    const router = useRouter();

    const openPopup = (method:string) => {
        if (method == 'cash') {

        } else if (method == 'promp') {
            router.replace('checkout?m=p');
        }
    }
    
    if (method == 'p') {
        return <Payment total={totalPrice}/>
    }

    return (
        <>
            {}
            <div className='grid gap-4 h-full'>
                <div className="bg-white w-full rounded p-5 text-2xl">
                    <div className='flex items-center'>
                        <Link href="/cashier">
                            <Arrow className="size-16" />
                        </Link>
                        <p className="text-4xl">Check out</p>
                    </div>
                    <div className="p-3 mt-5">
                        <p className="text-3xl">Order Detail</p>
                        <div className="grid grid-cols-2 p-4">
                            {Array.from({length: 7}).map((e, index) => (<FoodList key={index}/>))}
                        </div>
                        <div className='rounded border border-black p-4'>
                            <p className='text-3xl'>Price Detail</p>
                            <div className='mt-3 ps-5 grid gap-y-2'>
                                <p>Food Price : {data.food}</p>
                                <p>Drink : {data.drink}</p>
                                <div>
                                    <span>Discount : </span>
                                    <input type="number" className='outline-none border rounded px-2 py-1' min={0}
                                    onChange={(e) => {
                                        setTotalPrice((data.drink + data.food) - Number(e.target.value))
                                    }}/>
                                </div>
                                <p className='text-3xl mt-5 font-bold'>Total : {totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white w-full rounded p-5 text-2xl justify-self-end self-end'>
                    <div className='p-3'>
                        <p className='text-4xl mb-5'>Payment Method</p>
                        <div className='flex gap-5'>
                            <div onClick={() => openPopup('cash')} className='p-2 cursor-pointer grid justify-items-center items-center hover:border-orange-500 transition border 
                            border-transparent rounded'>
                                <Image src={wallet} alt=''/>
                                <p>Cash</p>
                            </div>
                            <div onClick={() => openPopup('promp')} className='p-2 cursor-pointer grid justify-items-center items-center hover:border-orange-500 transition border 
                            border-transparent rounded'>
                                <Image src={promptpay} alt=''/>
                                <p>Promptpay Scan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const FoodList = () => {
    return (
        <>
            <div className="mt-2 flex gap-5 items-center">
                <Image src={dummyImage} alt="" className="w-14 rounded-md"/>
                <p className="text-xl">Food name</p>
                <p>Price : 50฿</p>
            </div>
        </>
    )
}