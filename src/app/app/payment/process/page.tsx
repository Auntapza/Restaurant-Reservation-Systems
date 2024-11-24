'use client'

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import wallet from "@/img/payment/walletQr.jpg";
import promptpay from "@/img/payment/promppayQr.png";
import Textbox from "@/component/Textbox";


export default function PayProcess() {

    const param = useSearchParams()
    let payment = param.get('p');

    return (
        <>
            <div className="flex justify-center">
                <div className="container mt-5">
                    <div className="w-full flex justify-center">
                        {payment == 'wallet' ? 
                        (<Image src={wallet} alt=""/>)
                        :
                        (<Image src={promptpay} alt=""/>)}
                    </div>
                    <div className="mt-5 w-fit mx-auto">
                        <p className="text-4xl">Total : 20฿</p>
                    </div>
                    <form>
                        <Textbox type="time" placeholder="Pay Time"/>
                        <Textbox type="file" placeholder="Slip Image"/>
                        <button type="submit" className="mb-5 bg-orange-500 rounded-lg text-white text-3xl py-2 px-6 w-full mt-5">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}