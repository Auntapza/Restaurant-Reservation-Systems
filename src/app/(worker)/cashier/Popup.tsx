import Block from "@/component/Block";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonHTMLAttributes, MouseEventHandler, useEffect, useRef } from "react"

/// open table option function
export function TableOption({position, tableno, isOpen, close}: {
    position: {
        x: number,
        y: number
    },
    tableno: string,
    isOpen: boolean,
    close: MouseEventHandler
}) {

    const OptionBox = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (OptionBox.current) {
            if (isOpen) {
                OptionBox.current.className = `transition tableOptionShow`;
                OptionBox.current.style.transform = `translateX(${position.x - 130}px)`;
                OptionBox.current.style.transform += `translateY(${position.y}px)`;
            } else {
                OptionBox.current.className = `transition tableOptionHide`;
                OptionBox.current.style.transform = `translateX(0px)`;
                OptionBox.current.style.transform = `translateY(0px)`;
            }
        }
    }, [position])

    const List = ({children, ...rest}: ButtonHTMLAttributes<HTMLButtonElement>) => {
        return (
            <button {...rest} className="border-t mt-3 p-2 pe-5 hover:text-orange-500 transition text-start">
                {children}
            </button>
        )
    }


    return (
        <div className="transition" ref={OptionBox}>
            <p className="font-bold text-2xl">Table : {tableno}</p>
            <List>Resurve for walk-in customer</List>
            <List onClick={() => {router.push('cashier/checkout')}}>Check out</List>
            <button className="border-t mt-3 p-2 pe-5 text-red-500 transition text-start" onClick={close}>Close</button>
        </div>
    )
}

import qr from "@/img/payment/promppayQr.png"
import Button from "@/component/Button";

// payment popup
export function Payment({total}: {total: number}) {

    const router = useRouter();

    function checkoutConfirm() {
        router.replace('/cashier');
    }

    return (
        <>
            <Block className="w-fit absolute z-50 top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2">
                <Image src={qr} alt="" className="mx-auto"/>
                <h1 className="text-3xl text-center mb-5 font-bold underline">Price : {total}฿</h1>
                <p className="text-xl">Show this qr to customer</p>
                <p className="text-xl text-red-500 my-5">Make sure Customer make a real transactions before confirm payment</p>
                <div className="mt-4 grid grid-cols-2 gap-x-3">
                    <Button className="bg-red-500"
                    onClick={() => {router.replace('./checkout')}}>Cancel</Button>
                    <Button onClick={checkoutConfirm}>Confirm</Button>
                </div>
            </Block>
            <div className="bg-[#00000022] size-full fixed top-0" onClick={() => {
                router.replace('checkout')
            }}>
            </div>
        </>
    )
}