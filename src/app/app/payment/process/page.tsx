'use client'

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import wallet from "@/img/payment/walletQr.jpg";
import promptpay from "@/img/payment/promppayQr.png";
import Textbox from "@/component/Textbox";
import Button from "@/component/Button";
import { useOrder } from "@/hooks/order";
import { FormEvent, useEffect } from "react";
import base64encode from "@/function/base64encode";
import api from "@/function/api";
import toast from "react-hot-toast";
import cart from "@/function/cart";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function PayProcess() {

    const router = useRouter();

    const { order, setOrder, clear } = useOrder();

    useEffect(() => {
        if (order.tableId === "A0") {
            router.push('/app/payment')
        }
    }, [])

    const sendOrder = async(e: any) => {
        e.preventDefault();

        const payload = {
            files: await base64encode(e.target.file.files[0]),
            log: true
        }

        const sendOrderRes = api.post("http://localhost:4000/order/reservation", {
            reservationData: {
                price: 20,
                slip_img: payload.files,
                method: "promptpay"
            },
            tableId: order.tableId,
            foodList: order.foodList,
            time: order.orderTime
        })

        const data = await toast.promise(sendOrderRes, {
            loading: "Loadding...",
            success: "Order Placing",
            error: (err) => {
                return err.message
            }
        })

        if (data.slipData.success == true) {
            await cart.removeAll();
            socket.emit("table update");
            clear();
            router.push("/app/recipt/"+data.order.order_id);
        }

    }

    return (
        <>
            <div className="flex justify-center">
                <div className="container mt-5">
                    <div className="w-full flex justify-center">
                        {false ? 
                        (<Image src={wallet} alt=""/>)
                        :
                        (<Image src={promptpay} alt=""/>)}
                    </div>
                    <div className="mt-5 w-fit mx-auto">
                        <p className="text-4xl">Total : 20฿</p>
                    </div>
                    <form onSubmit={sendOrder}>
                        <Textbox type="file" name="file" placeholder="Slip Image"/>
                        <Button itemType="Submit" className="mb-5 bg-orange-500 rounded-lg text-white text-3xl py-2 px-6 w-full mt-5">Submit</Button>
                    </form>
                </div>
            </div>
        </>
    )
}