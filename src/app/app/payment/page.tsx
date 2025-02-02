'use client'

import Button from "@/component/Button";
import { useOrder } from "@/hooks/order";
import promptpay from "@/img/payment/PromptpayLogo.png";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Payment() {

    const router = useRouter();
    const { order, } = useOrder();

    const payment = [
        {
            text: 'Promptpay',
            image: promptpay,
            value: 'promptpay'
        },
    ]

    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if (order.tableId == "A0") {
            router.replace('summery')
        }
    }, [])
    
    return (
        <>
            <div className="mt-5 flex justify-center">
            <div className="container">
                <p className="text-5xl">Payment Method</p>
                <div className="grid grid-cols-4 w-full mt-5">

                    {payment.map((e, index) => (
                        <Checkbox checked={paymentMethod} set={setPaymentMethod} data={e} key={index}/>
                    ))}

                </div>
            </div>
        </div>
        <div className="fixed bottom-0 w-full flex justify-center bg-white
        border shadow-[0_-4px_4px_0_#00000055] py-7 rounded-t-xl">
            <div className="container flex justify-between items-center">
                <div></div>
                <div className="flex items-center gap-7">
                    <Button className="py-4 px-8 2xl:text-3xl xl:text-2xl disabled:bg-orange-300
                    transition" disabled={paymentMethod == ''}
                    onClick={() => {router.push('payment/process?p='+paymentMethod)}}>Purchase Order</Button>
                </div>
            </div>
        </div>
        </>
    )
}

const Checkbox = ({checked, data, set} :{
    checked : string,
    data : {
        text: string,
        image: StaticImageData,
        value: string
    },
    set: Dispatch<SetStateAction<string>>
}) => {

    const toggle = (value:string) => {
        if (checked == value) {
            set('');
        } else {
            set(value);
        }
    }

    return (
        <>
            <div className="p-6 h-full cursor-pointer" onClick={() => {toggle(data.value)}}>
                <Image src={data.image} alt="" className={"border transition rounded size-full object-scale-down "
                 + (checked == data.value ? 'border-orange-500 shadow-lg' : 'border-black')}/>
                <p className="font-bold text-3xl text-center mt-3">{data.text}</p>
            </div>
        </>
    )
}