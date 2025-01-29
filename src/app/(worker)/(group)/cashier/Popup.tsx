import Block from "@/component/Block";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from "react"

interface TableData {
    tableId: string;
    status: number;
}

enum OrderType {
    "walkin",
    "checkin"
}

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
    const [status, setStatus] = useState<number>(0);

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

    useEffect(() => {
        async function getTableStatus() {
            const tableData = await api.get("http://localhost:4000/table") as TableData[];
            const tableStatus = tableData.filter(e => e.tableId == tableno)[0];
            if (tableStatus != undefined) {
                setStatus(tableStatus.status)
            } else {
                setStatus(100);
            }
        }
        getTableStatus();
    }, [tableno])

    async function addOrder(type:OrderType) {
        if (type == OrderType.walkin) {

            await api.post("http://localhost:4000/order/walkin", {
                tableId: tableno
            });
            
        } else if (type == OrderType.checkin) {

            await api.post("http://localhost:4000/order/checkin", {
                tableId: tableno
            });

        } else {
            toast.error("Order Type Error");
        }
    }

    const List = ({children, className, ...rest}: ButtonHTMLAttributes<HTMLButtonElement>) => {
        return (
            <button {...rest} className={`border-t mt-3 p-2 pe-5 hover:text-orange-500 transition text-start ${className}`}>
                {children}
            </button>
        )
    }

    const Condition = () => {
        if (status == 0) {
            return <List onClick={() => {addOrder(OrderType.walkin)}}>Resurve for walk-in customer</List>
        } else if (status == 1) {
            return <List onClick={() => {router.push('cashier/checkout/'+tableno)}}>Check out</List>
        } else if (status == 2) {
            return <List onClick={() => {addOrder(OrderType.checkin)}} className="pe-[10rem]">Check in</List>
        } 
    }

    return (
        <div className="transition" ref={OptionBox}>
            <p className="font-bold text-2xl">Table : {tableno}</p>
            <Condition/>
            <button className="border-t mt-3 p-2 pe-5 text-red-500 transition text-start" onClick={close}>Close</button>
        </div>
    )
}

import qr from "@/img/payment/promppayQr.png"
import Button from "@/component/Button";
import api from "@/function/api";
import toast from "react-hot-toast";

interface popup {
    total: number,
    state: Dispatch<SetStateAction<string>>
}

// payment popup
export function Payment({total, state}: popup) {

    const router = useRouter();
    const { tableid } = useParams();

    async function checkoutConfirm() {

        const res = api.post('http://localhost:4000/order/pay/scan', {
            tableid
        })

        await toast.promise(res, {
            loading: "Loadding...",
            success: (res) => {
                router.push('/cashier')
                return res.msg
            },
            error: (err) => err.msg
        })

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
                    onClick={() => {state('h')}}>Cancel</Button>
                    <Button onClick={checkoutConfirm}>Confirm</Button>
                </div>
            </Block>
            <div className="bg-[#00000022] size-full fixed top-0" onClick={() => {
                state('h')
            }}>
            </div>
        </>
    )
}

export function Cash({total, state}: popup) {

    const router = useRouter();
    const [change, setChange] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const {tableid} = useParams();

    console.log(tableid);

    const calculateChange = (e: ChangeEvent<HTMLInputElement>) => {

        const change = Number(e.target.value) - total
        setAmount(Number(e.target.value));
        setChange(change);
        
    }
    
    async function putTrancation() {
        if (change < 0 || amount == 0) {
            toast.error("Not enough money");
        } else {
            const res = api.post("http://localhost:4000/order/pay/cash", {
                amount,
                tableid
            })

            await toast.promise(res, {
                loading: "Loadding...",
                success: (res) => {
                    router.push('/cashier')
                    return res.msg
                },
                error: (err) => err.msg
            })
        }
    }

    return (
        <>
            <Block className="w-2/3 absolute z-50 top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2">
                <div className="container mx-auto p-4">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-2xl mb-4">Cash payment</h2>

                        <div className="space-y-4 mb-6 text-xl">
                            <div>
                                <label className="block text-gray-700 mb-2">Total Price</label>
                                <div 
                                    id="totalAmount" 
                                    className="w-full p-3 bg-gray-100 rounded-lg text-2xl text-right font-bold text-blue-600">
                                    ฿{total}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Amount received</label>
                                <input 
                                    id="receivedAmount" 
                                    type="number" 
                                    className="w-full outline-none
                                     p-3 border rounded-lg text-2xl text-right" 
                                    placeholder="Enter amount"
                                    onChange={calculateChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Change</label>
                                <div 
                                    id="changeAmount" 
                                    className="w-full p-3 bg-gray-100 rounded-lg text-2xl text-right font-bold text-green-600">
                                    ฿{change}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button onClick={putTrancation}
                                id="calculateChangeBtn" 
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg">
                                Submit
                            </button>
                            {/* <a href="receipt.html">
                                <button className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-medium">
                                    พิมพ์ใบเสร็จ
                                </button>
                            </a> */}
                            <button onClick={() => {state('h')}} className="w-full text-red-500 hover:bg-red-50 py-3 rounded-lg font-medium">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Block>
            <div className="bg-[#00000022] size-full fixed top-0" >
            </div>
        </>
    )

}   