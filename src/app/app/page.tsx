'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// import image
import glasses from '@/img/mainpage/Search.svg'
import Foodpopup from './FoodPopup'
import Footer from '@/component/Footer'
import { foodData } from '@/interface/interface'
import FoodList from './FoodList'
import banner from '@/img/homepage/banner.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import useFetchData from '@/hooks/useFetch'

interface MenuList {
    food_img: string,
    food_name: string,
    quantity: number
}

interface CurrentOrder {
    order_id: number,
    table_id: string,
    fullname: string,
    order_date: Date,
    service_time: Date,
    MenuList: MenuList[]
}

function Mainpage() {

    const [menuDetails, setMenuDetails] = useState(false);
    const [foodPopupData, setFoodPopupData] = useState<foodData>();
    const [catSelect, setCatSelect] = useState<number>(0);
    const [searchVal, setSearchVal] = useState<string>('');

    const { data, loader } = useFetchData<CurrentOrder>({
        url: 'http://localhost:4000/user/order'
    })

    console.log(data);
    
    // For category looping
    const CategoryData = [
        {
            image: <Drink/>,
            text: "Drink",
            id: 1,
        },
        {
            image: <Donut/>,
            text: "Snack",
            id: 2,
        },
        {
            image: <Fork/>,
            text: "Main Course",
            id: 3,
        },
    ];

    function selectCategory(value:number) {
        if (catSelect == value) {
            setCatSelect(0);
        } else {
            setCatSelect(value);
        }
    }

    useEffect(() => {
        if (foodPopupData) {
            setMenuDetails(true);
        } else {
            setMenuDetails(false);
        }
    }, [foodPopupData])

    useEffect(() => {
        if (menuDetails == false) {
            setFoodPopupData(undefined);
        }
    }, [menuDetails])

    return (

        <>
            <Foodpopup data={foodPopupData as foodData} isOn={menuDetails} state={setMenuDetails}/>
            {/* Banner */}
            {data ? 
                <div className='h-[30rem] container mx-auto'>
                    <div className='flex h-full w-full'>
                        <div className='bg-white w-full mt-5'>
                            <p className='text-3xl font-bold'>Order No : {data.order_id}</p>
                            <div className='my-5 px-4 flex gap-10 items-center'>
                                <FontAwesomeIcon icon={faUser} className='text-7xl'/>
                                <p className='text-2xl'>{data.fullname}</p>
                            </div>
                            <div className='px-4 text-3xl grid gap-5'>
                                <p>Table No : {data.table_id}</p>
                                <p>Order Time : {new Date(data.order_date).toString().split(' ')[4].slice(0, 5)}</p>
                                <p>Check-in Time : {new Date(data.service_time).toString().split(' ')[4].slice(0, 5)}</p>
                            </div>
                        </div>
                        <div className='bg-orange-500 w-full p-10'>
                            <div className='bg-white rounded-xl border p-3 border-black shadow size-full'>
                                <p className='text-3xl font-bold'>Menu List</p>

                                <div className='px-4 mt-4'>
                                    {data.MenuList.map((e, index) => 
                                    <div className='flex w-full justify-between items-center' key={index}>
                                        <Image src={e.food_img} width={500} height={500} alt='' className='size-20 object-cover roundedlg mb-5'/>
                                        <p className='text-xl'>{e.food_name}</p>
                                        <p className='text-xl'>x{e.quantity}</p>
                                    </div>)}
                                </div>

                            </div>
                        </div>
                    </div>
                </div> :
                <Image src={banner} alt='' className='w-full'/>
        }

            {/* Category */}
            <div className='relative after:bg-black after:w-full after:h-[2px] after:absolute flex justify-center items-center 
            my-10 after:-z-50 after:top-1/2'>
                <span className='text-5xl font-bold text-center bg-white px-10'>Category</span>
            </div>
            <div className='flex flex-row-reverse justify-center items-center border-b-[2px] border-black pb-10'>
                {/* Loop Category button */}
                {CategoryData.map((e, index) => (
                    <div key={index} onClick={() => {selectCategory(index+1)}} className="container flex justify-evenly items-center">
                        <div className={`flex flex-col items-center gap-2 cursor-pointer group`}>
                            <div className={`border p-4 rounded-full group-hover:border-orange-600 ${catSelect == e.id ? 'border-orange-500' : 'border-black'}`}>
                                {e.image}
                            </div>
                            <span className={`font-bold text-2xl group-hover:text-orange-600 transition ${catSelect == e.id ? 'text-orange-500' : ''}`}>{e.text}</span>
                        </div>
                    </div>
                ))}

            </div>

            {/* content position : 860 */}

            <div className='flex justify-center items-center gap-5 my-12'>
                <span className='font-bold text-3xl'>Search</span>
                <form onSubmit={(e:any) => {
                    e.preventDefault();

                    setSearchVal(e.target.text.value);
                }}>
                    <input type="text"
                    className='border ps-2 border-black rounded w-96 text-2xl p-1' 
                    placeholder='Write something' name='text'
                    />
                    <button type='submit'></button>
                </form>
                <Image alt='' src={glasses} className='cursor-pointer'/>
            </div>

            <div className='flex justify-center'>
                <FoodList setFoodPopup={setFoodPopupData} cat={catSelect} searchVal={searchVal}/>
            </div>

            <Footer/>

        </>

    )
}

function Fork() {
    return (
        <>
            <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.7781 3.9375V39.7688H38.5874V17.1281C38.5874 13.6298 39.9771 10.2746 42.4508 7.80092C44.9245 5.3272 48.2797 3.9375 51.7781 3.9375Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-orange-600 transition'/>
                <path d="M44.0999 39.5719H51.778V56.1094C51.778 57.1015 51.3839 58.0529 50.6824 58.7544C49.9809 59.4559 49.0294 59.85 48.0374 59.85H47.8405C46.8485 59.85 45.897 59.4559 45.1955 58.7544C44.494 58.0529 44.0999 57.1015 44.0999 56.1094V39.5719Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-orange-600 transition'/>
                <path d="M18.8999 59.85C17.699 59.85 16.5473 59.3729 15.6981 58.5238C14.8489 57.6746 14.3718 56.5228 14.3718 55.3219L16.3406 30.7125H21.6562L23.6249 55.3219C23.6255 55.9335 23.5022 56.5388 23.2624 57.1015C23.0227 57.6641 22.6714 58.1723 22.2298 58.5954C21.7883 59.0186 21.2656 59.3479 20.6933 59.5635C20.121 59.7792 19.5109 59.8766 18.8999 59.85Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-orange-600 transition'/>
                <path d="M27.7594 21.8531C27.4401 24.0007 26.36 25.9621 24.7158 27.3799C23.0716 28.7978 20.9727 29.5778 18.8016 29.5778C16.6305 29.5778 14.5316 28.7978 12.8874 27.3799C11.2431 25.9621 10.163 24.0007 9.84375 21.8531H27.7594Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-orange-600 transition'/>
                <path d="M9.84375 5.51248V21.8531" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-orange-600 transition'/>
                <path d="M18.7031 5.51248V21.4594" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-orange-600 transition'/>
                <path d="M27.7593 5.51248V21.8531" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='group-hover:stroke-orange-600 transition'/>
            </svg>
        </>
    )
}

function Donut() {
    return (
        <>
            <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M72.9906 44.2652C72.0995 52.354 68.2635 59.8019 62.2471 65.1243C56.2308 70.4466 48.476 73.2524 40.5289 72.9822C32.5819 72.712 25.0262 69.3857 19.368 63.6665C13.7099 57.9472 10.3649 50.2552 10 42.1236C10.0394 40.4488 10.1948 38.779 10.4649 37.1266C10.6106 39.5121 11.5493 41.7747 13.1249 43.5386C14.7005 45.3024 16.8181 46.4613 19.126 46.8226C21.4339 47.184 23.7931 46.726 25.8116 45.5249C27.8302 44.3238 29.3866 42.4518 30.2221 40.22C30.4805 39.7006 30.6383 39.1351 30.6869 38.5544C31.4067 35.9249 33.0053 33.6375 35.2038 32.091C37.4022 30.5445 40.0612 29.837 42.717 30.0919C45.3728 30.3468 47.857 31.5479 49.7364 33.4857C51.6157 35.4236 52.7711 37.9753 53.001 40.6959V42.8375C53.2908 45.3816 54.5021 47.7219 56.3957 49.3961C58.2893 51.0703 60.7274 51.9564 63.2283 51.8796C65.4509 51.9024 67.6175 51.166 69.3855 49.787C71.1536 48.408 72.4221 46.465 72.9906 44.2652Z" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M53.0011 42.1236V42.8375C52.881 45.8466 51.6282 48.6914 49.5051 50.7761C47.3821 52.8608 44.5535 54.0237 41.6116 54.0212C38.5293 54.0212 35.5732 52.7677 33.3937 50.5365C31.2141 48.3053 29.9897 45.2791 29.9897 42.1236C29.9897 41.4098 30.2222 40.9338 30.2222 40.22C30.4806 39.7006 30.6384 39.1351 30.687 38.5544C31.4068 35.9249 33.0054 33.6375 35.2038 32.091C37.4023 30.5445 40.0613 29.837 42.7171 30.0919C45.3729 30.3468 47.8571 31.5479 49.7365 33.4857C51.6158 35.4236 52.7712 37.9753 53.0011 40.6959V42.1236Z" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M72.9903 42.1236V44.2651C72.4218 46.4649 71.1533 48.4079 69.3852 49.7869C67.6172 51.166 65.4506 51.9023 63.228 51.8795C60.7271 51.9563 58.289 51.0702 56.3954 49.396C54.5018 47.7219 53.2905 45.3815 53.0007 42.8374V40.6958C52.7708 37.9752 51.6154 35.4235 49.7361 33.4857C47.8567 31.5478 45.3725 30.3467 42.7167 30.0918C40.0609 29.8369 37.4019 30.5444 35.2035 32.0909C33.005 33.6374 31.4064 35.9248 30.6866 38.5543C30.4542 39.0302 30.4542 39.744 30.2218 40.2199C29.3862 42.4517 27.8299 44.3237 25.8113 45.5248C23.7928 46.7259 21.4336 47.1839 19.1257 46.8226C16.8178 46.4612 14.7001 45.3023 13.1246 43.5385C11.549 41.7747 10.6103 39.512 10.4646 37.1266C10.7158 35.3528 11.1044 33.6022 11.6268 31.8916C13.7938 25.5124 17.8427 19.9797 23.214 16.0581C28.5853 12.1365 35.0139 10.0197 41.6112 10C49.217 9.98819 56.568 12.8047 62.2972 17.9257C68.0264 23.0467 71.7438 30.1237 72.7579 37.8404C72.9508 39.2591 73.0284 40.6917 72.9903 42.1236Z" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.3896 36.6507L24.1789 33.3193" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32.5467 26.4188L29.2925 23.8013" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M58.115 27.1326L54.8608 24.5151" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M41.8438 22.1355L44.4005 18.8042" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M61.834 39.0302L64.6233 35.6989" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    )
}

function Drink() {
    return (
        <>
            <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5938 38.7844L45.2812 15.9469H5.90625L25.5938 38.7844ZM25.5938 38.7844L45.2812 15.9469H5.90625L25.5938 38.7844Z" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25.5938 38.7844V56.5032" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.6001 56.5032H38.5876" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.9158 29.1375H33.272" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M35.2407 15.9469C35.2407 13.961 35.8296 12.0198 36.9329 10.3686C38.0361 8.71746 39.6043 7.43051 41.439 6.67056C43.2737 5.9106 45.2925 5.71176 47.2402 6.09918C49.1879 6.4866 50.9769 7.44292 52.3811 8.84713C53.7853 10.2513 54.7416 12.0404 55.129 13.9881C55.5164 15.9358 55.3176 17.9546 54.5576 19.7893C53.7977 21.624 52.5108 23.1921 50.8596 24.2954C49.2085 25.3987 47.2671 25.9875 45.2813 25.9875C42.8721 25.9756 40.5545 25.0626 38.7844 23.4281" stroke="black" className='group-hover:stroke-orange-600 transition' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </>
    )
}

export default Mainpage