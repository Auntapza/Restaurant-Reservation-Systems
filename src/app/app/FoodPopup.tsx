'use client'

import Image from 'next/image'

import dummyFoodImage from '@/img/homepage/dummyPopfood.png'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function Foodpopup({isOn, state}: {
    isOn: boolean,
    state: Dispatch<SetStateAction<boolean>>
}) {

    const [foodCount, setFoodCount] = useState(1);

    const handleFoodCountControl = (control: string) => {
        if (isOn) {
            if (control === "+" && foodCount < 10) {
                setFoodCount(foodCount+1);
            } else if (control === "-" && foodCount > 1) {
                setFoodCount(foodCount-1);
            }
        }  
    };

    useEffect(() => {
        setFoodCount(1);        
    }, [isOn])

    return (
        <div className={isOn ? 'grid w-screen h-screen fixed place-items-center z-50 top-0' : 'hidden'}>
            <div onClick={() => {state(false)}} className='bg-[#00000055] w-full h-full absolute -z-50'></div>
            <div className="bg-white rounded-xl overflow-hidden w-3/4 max-w-[40rem] relative">
                <span onClick={() => {state(false)}} className='border-2 p-2 text-3xl px-4 hover:border-red-600 hover:text-red-600
                 rounded-full border-black absolute top-2 left-2 cursor-pointer transition'>X</span>
                <Image src={dummyFoodImage} alt='' className='w-full h-72 object-cover'/>
                <div className='p-4'>
                    <div>
                        <p className='text-5xl font-bold'>Pizza</p>
                        <p className='text-3xl mt-3'>Price : 150฿</p>
                    </div>
                    <div className='mt-8 border-t-2 pt-5 border-orange-500 select-none'>
                        <div className='flex gap-x-5 items-center justify-evenly px-14 mb-5'>
                            <div onClick={() => {handleFoodCountControl("-")}} className='hover:text-orange-500 transition cursor-pointer rounded-full p-2 px-7 pb-4 text-6xl shadow border'>
                                <span>-</span>
                            </div>
                            <input className='text-4xl text-center outline-none w-20' onChange={(e) => {
                                setFoodCount(Number(e.target.value))
                            }} value={foodCount} type='number' min={1} max={10}/>
                            <div onClick={() => {handleFoodCountControl("+")}} className='hover:text-orange-500 transition cursor-pointer rounded-full p-2 px-5 pb-4 text-6xl shadow border'>
                                <span>+</span>
                            </div>
                        </div>
                        <h1 className='text-center text-3xl mb-10 bg-orange-500 w-fit m-auto cursor-pointer p-3 rounded px-10
                        text-white shadow'>Add to cart</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}