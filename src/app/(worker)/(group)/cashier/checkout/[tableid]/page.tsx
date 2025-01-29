'use client'

interface Food {
    cat_id: number;
    date_create: string;
    food_id: number;
    food_img: string;
    food_name: string;
    food_price: number;
    text: string | null;
}
  
interface OrderDetail {
    Food: Food;
    food_id: number;
    order_id: number;
    quantity: number;
}

interface Order {
    acc_id: number;
    order_date: string;
    order_id: number;
    order_status: string;
    receipt_img: string | null;
    table_id: string | null;
    OrderDetail: OrderDetail[];
}
  

import Image from "next/image"
import cash from "@/img/image.png";
import promptpay from "@/img/payment/PromptpayLogo.png";
import Link from 'next/link';
import Arrow from '@/component/Arrow';
import { Cash, Payment } from '../../Popup';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useFetchData from '@/hooks/useFetch';
import Loading from '@/component/Load';

export default function Main() {
    
    const { tableid } = useParams();
    const { data, loader } = useFetchData<Order>({
        url: "http://localhost:4000/order/table/"+tableid
    })
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [page, setPage] = useState<string>('h');

    useEffect(() => {
        setTotalPrice(data?.OrderDetail.reduce((sum, e) => sum + (e.Food.food_price * e.quantity), 0) as number)
    }, [loader])

    const openPopup = (method:string) => {
        if (method == 'cash') {
            setPage('c');
        } else if (method == 'promp') {
            setPage('p');
        }
    }

    if (page == 'p') {
        return <Payment state={setPage} total={totalPrice}/>
    } else if (page == "c") {
        return <Cash state={setPage} total={totalPrice}/>
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
                            <Loading loadding={loader} fallback={<p>Loadding</p>}>
                                {data?.OrderDetail?.map((e, index) => (<FoodList data={e} key={index}/>))}
                            </Loading>
                        </div>
                        <div className='rounded border border-black p-4'>
                            <p className='text-3xl'>Price Detail</p>
                            <div className='mt-3 ps-5 grid gap-y-2'>
                                <p>Food Price : {data?.OrderDetail.reduce((sum, e) => {
                                    if (e.Food.cat_id != 3) {
                                        return sum + (e.Food.food_price * e.quantity)
                                    } else {
                                        return sum + 0
                                    }
                                }, 0)}</p>
                                <p>Drink : {data?.OrderDetail.reduce((sum, e) => {
                                    if (e.Food.cat_id == 3) {
                                        return sum + (e.Food.food_price * e.quantity)
                                    } else {
                                        return sum + 0
                                    }
                                }, 0)}</p>
                                <div>
                                    <span>Discount : </span>
                                    <input type="number" className='outline-none border rounded px-2 py-1' min={0}
                                    onChange={(e) => {
                                        setTotalPrice(data?.OrderDetail.reduce((sum, e) => sum + (e.Food.food_price * e.quantity), 0) as number - Number(e.target.value))
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
                                <Image src={cash} width={200} height={200} alt=''/>
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


const FoodList = ({ data } : { data:OrderDetail }) => {

    const food = data.Food as Food

    return (
        <>
            <div className="mt-2 flex gap-5 items-center">
                <Image width={500} height={500} src={food.food_img} alt="" className="w-14 rounded-md"/>
                <p className="text-xl">{food.food_name}</p>
                <p>Price : {food.food_price}฿</p>
            </div>
        </>
    )
}