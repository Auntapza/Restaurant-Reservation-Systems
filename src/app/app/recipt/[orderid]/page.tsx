'use client'

import useFetchData from "@/hooks/useFetch";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
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
    order_id: number;
    food_id: number;
    quantity: number;
    Food: Food;
}

interface Order {
    order_id: number;
    order_date: string;
    table_id: string;
    order_status: string;
    acc_id: number;
    receipt_img: string | null;
    OrderDetail: OrderDetail[];
    service_time: string
}

function ConvertTime(timeString: string) {
    const old = new Date(timeString);
    
    return `${old.getDate()}/${old.getMonth()+1}/${old.getFullYear()}|${old.toString().split(" ")[4].slice(0,5)}`
}  

export default function Main() {

    const { orderid } = useParams();

    const { data, loader } = useFetchData<Order>({
        url: "http://localhost:4000/order/"+orderid
    })
    
    const router = useRouter();

    const totalPrice = data?.OrderDetail.reduce((sum, e) => sum + (e.Food.food_price * e.quantity), 0)

    const FoodCol = ({data}:{data:OrderDetail}) => {
        return (
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-800">{data.Food.food_name}</p>
                    <p className="text-sm text-gray-500">{data.Food.food_price} × {data.quantity}</p>
                </div>
                <p className="text-gray-800">฿{data.Food.food_price * data.quantity}</p>
            </div>
        )
    }

    if (loader) {
        return <Loadding/>
    }

    return (
        <div className="container mx-auto">
            <div className="bg-green-50 rounded-t-3xl px-6 pt-8 pb-6 text-center mt-6">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faCheck} className="text-green-600 text-3xl" />
                </div>
                <h2 className="text-green-800 text-xl font-bold">Order Success</h2>
                <p className="text-green-600 text-sm">Thank for using our service</p>
            </div>

            <div className="bg-white shadow-lg rounded-3xl">
                {/* Restaurant Info */}
                <div className="pt-8 pb-6 px-6 text-center border rounded-t-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <i className="fas fa-utensils text-orange-500" />
                        <h1 className="text-2xl font-bold">FOOD<span className="text-orange-500">LAND</span></h1>
                    </div>
                </div>
                {/* Receipt Details */}
                <div className="p-6">
                    <div className="flex justify-between mb-6">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-600">Order No: <span className="text-gray-800 font-medium">{orderid}</span></p>
                            <p className="text-sm text-gray-600">Order Date: <span className="text-gray-800">{ConvertTime(data?.order_date as string).split("|")[0]}</span></p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-sm text-gray-600">Table No: <span className="text-gray-800 font-medium">{data?.table_id}</span></p>
                            <p className="text-sm text-gray-600">Service Time: <span className="text-gray-800">{ConvertTime(data?.service_time as string).split("|")[1]}</span></p>
                        </div>
                    </div>
                    {/* Order Items */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <h3 className="font-medium text-gray-800 mb-3">Food List</h3>
                        <div className="space-y-3">
                            {data?.OrderDetail.map((e, index) => <FoodCol data={e} key={index}/>)}
                        </div>
                    </div>
                    {/* Summary */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center pt-3 border-t">
                            <span className="font-bold text-gray-800">Total Price</span>
                            <span className="text-xl font-bold text-green-600">฿{totalPrice}</span>
                        </div>
                    </div>
                    {/* Thank You Message */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">Please keep the receipt as proof.</p>
                    </div>
                </div>
                {/* Actions */}
                <div className="border-t p-6 flex gap-3">
                    {/* <button className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition">
                        <i className="fas fa-print mr-2" />พิมพ์
                    </button> */}
                    <button onClick={() => {router.push('/app')}} className="flex-1 bg-orange-600  text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition">
                        Back to home page
                    </button>
                </div>
            </div>
        </div>

    )
}

function Loadding() {
    return (
        <div className="size-full h-screen grid place-items-center">
            <div role="status">
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}