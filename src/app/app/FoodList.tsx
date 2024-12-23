import useFetchData from "@/hooks/useFetch";
import { foodData } from "@/interface/interface";
import dummyFoodCard from "@/img/mainpage/dummyText.png"
import Image from "next/image";
import star from "@/img/homepage/star.png"
import Loading from "@/component/Load";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FoodCardLoader from "@/component/load/foodCartLoader";

export default function FoodList({setFoodPopup, cat, searchVal} : {
    setFoodPopup: Dispatch<SetStateAction<any>>,
    cat:number,
    searchVal: string
}) {

    const [foodData, setFoodData] = useState<foodData[]>();

    const { data, loader, fetchData } = useFetchData<foodData[]>({
        url: 'http://localhost:4000/app/foodList',
        params: searchVal == '' ? undefined : {search: searchVal}
    })

    useEffect(() => {
        setFoodData(data);
    }, [data])

    useEffect(() => {
        if (cat == 0) {
            setFoodData(data);
        } else {
            const raw = data?.map(e => {
                if (e.catId == cat) {
                    return e
                }
            })

            setFoodData(raw?.filter(e => e !== undefined));
        }
    }, [cat])

    useEffect(() => {
        fetchData();
    }, [searchVal])

    return (
        <div className="container grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
         grid-cols-1 gap-y-9 gap-x-5">
            <Loading fallback={<FoodCardLoader/>} loadding={loader}>
                {foodData?.map((e, index) => <FoodCard isShow={setFoodPopup} data={e} key={index}/>)}
            </Loading>
        </div>
    )

}

const FoodCard = ({data, isShow} : {data: foodData, isShow:Dispatch<SetStateAction<any>>}) => {

    return (
        <div onClick={() => {isShow(data)}} className='bg-white 
        border border-black rounded-md shadow-xl p-5 grid gap-y-2 
        hover:scale-110 transition hover:border-orange-500 cursor-pointer'>
            <Image alt='' width={500} height={500} 
            src={data.foodImg ? data.foodImg : dummyFoodCard} className="aspect-square
            object-cover"/>
            <p className='text-3xl'>{data.foodName}</p>
            {/* for rate feture */}
            {/* <div className='flex items-center text-xl'>
                <span>4.5</span>
                <Image alt='' src={star} className='scale-75'/>
            </div> */}

            <p className='text-xl pt-8'>{data.foodPrice}฿</p>

        </div>
    );
}