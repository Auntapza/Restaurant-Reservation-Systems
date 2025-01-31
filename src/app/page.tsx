// 'use client'

import Logo from "@/component/Logo";
import Image from "next/image";

// import all use image
import background from "../img/homepage/homepageBackground.svg"
import pizza from "../img/homepage/pizza.png"
import pizzaWater from "../img/homepage/water.png"
import leaf from "../img/homepage/leaf.png"
import star from "../img/homepage/star.png"
import Footer from "@/component/Footer";
import { redirect, useRouter } from "next/navigation";
import useFetchData from "@/hooks/useFetch";
import api from "@/function/api";
import Link from "next/link";

interface TopFood {
    rate: number,
    foodname: string,
    foodImg: string
}

export default async function Home() {

  const data = await api.get('http://localhost:4000/homepage') as TopFood[]

  // Food card components
  const FoodCard = ({ data } : {
    data: {
      rate: number,
      foodname: string,
      foodImg: string
    }
  }) => {

    return (
      <div className="grid align-center group">

        <div className="shadow rounded-lg overflow-hidden relative">
          <div className="size-full bg-gradient-to-t from-black
          to-transparent absolute flex flex-col justify-between items-center py-5 translate-y-full 
          group-hover:translate-y-0 transition-all duration-500">
            <div className="flex self-top relative after:bg-yellow-400 after:w-full after:h-2 after:absolute after:-bottom-4">
              {Array.from({length: data.rate}).map((e, index) => <Image alt="" key={index} src={star}/>)}
            </div>
            <p className="text-6xl text-white mb-5">{data.foodname}</p>
          </div>
          <Image alt="" className="size-96 object-cover" src={data.foodImg} width={500} height={500}/>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-hidden">
      <Image alt="" src={background} className="absolute lg:right-[-4rem] lg:top-[-5rem] 2xl:h-[120vh] 
      lg:h-[90vh] w-auto object-cover z-0 md:h-[70vh] md:top-[-3rem] md:right-[-4rem]
      translate-x-14"/>

      {/* first dialog */}
      <div className="flex justify-center">
        <div className="container z-20">

          <div className="flex justify-between">
            {/* Left side of page */}

            <div className="ms-14">
              {/* Logo image */}
              <Logo className='relative mt-[7rem] md:w-[220px]'/>

              {/* Text on first page */}
              <p className="2xl:text-8xl mt-12 lg:text-6xl md:text-4xl">Make food <br />is <br />More food</p>

              {/* Book now button */}
              <Link href={'/app'} className="bg-orange-500 inline-block text-white lg:py-5 md:py-3
              relative lg:px-20 md:px-14 lg:text-4xl font-normal
               lg:rounded-xl md:rounded-md shadow-lg md:text-xl mt-[7rem]
               hover:scale-110 transition-all duration-500">
                Start using
                <Image alt="" src={leaf} className="absolute lg:-top-24 lg:-left-24 md:-top-8 md:-left-8"/>
                <Image alt="" src={leaf} className="absolute lg:size-20 md:size-14 rotate-[-51deg] top-0 right-0"/>
              </Link>
              <p className="text-3xl my-3 mx-7">Or</p>
              <Link href={'/login'} className="bg-orange-500 inline-block text-white lg:py-5 md:py-3
              relative lg:px-20 md:px-14 lg:text-4xl font-normal
               lg:rounded-xl md:rounded-md shadow-lg md:text-xl
               hover:scale-110 transition-all duration-500">
                Logging in
              </Link>
            </div>

            {/* right side of first page */}

            <div>
                {/* pizza image */}
                <div className="relative">
                  <Image alt="" src={pizza} className="mt-[7rem] lg:size-[500px] 2xl:size-[705px] animate-homepage-spin-slow 
                  object-cover z-50 md:size-[400px]"/>
                  <Image alt="" src={pizzaWater} className="absolute top-[-4rem] left-[-14rem] -z-10 rotate-[62deg]"/>
                  <Image alt="" src={pizzaWater} className="absolute right-[-6rem] bottom-[-9rem] -z-10 rotate-[-68deg]"/>
                </div>
            </div>

          </div>
        </div>
      </div>

        {/* Second dialog */}

        <div className="flex justify-center">
          <div className="container">
            <div className="my-[20rem]">

              {/* Most pop Text style */}
              <div className="w-full text-center text-4xl
              before:w-full before:h-1 before:bg-black relative before:absolute before:left-0 before:-z-50 before:top-1/2">
                <span className="bg-white">🍴Most Popular🍴</span>
              </div>

              {/* Food card */}

              <div className="flex justify-between mt-20">
                {data.map((e, index) => <FoodCard data={e} key={index}/>)}
              </div>

              </div>
            </div>
        </div>

        <Footer/>
    </div>
  );
}
