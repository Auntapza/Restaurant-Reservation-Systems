'use client'

import { Chart } from "chart.js/auto"
import { useEffect, useRef, useState } from "react"

import { Cart, Menu } from "@/img/svg/svg";
import Dashbord from "@/img/dashbord";
import User from "@/img/user";
import DataBlock from "./datablock";
import useFetch from "@/hooks/useFetch";
import fetchData from "./fetch";

interface dashboradData {
    totalMenu: number,
    totalOrder: number,
    totalClient: number,
    todayRevenu: number,
    chart: {
        ChartLabel: string[],
        revenuData: number[]
        orderData: number[]
    }
}

// Mainpage
export default function Mainpage() {

    const { data, loader } = useFetch<dashboradData>({
        url: "http://localhost:4000/admin"
    }) 

    const blockData = [
        {
            title: 'Total menu',
            value: data?.totalMenu,
            image: <Menu/>
        },
        {
            title: 'Total Order Today',
            value: data?.totalOrder,
            image: <Cart/>
        },
        {
            title: 'Total Client Today',
            value: data?.totalClient,
            image: <User/>
        },
        {
            title: 'Today Revenue',
            value: `${data?.todayRevenu}฿`,
            image: <Dashbord/>
        } 
    ]

    console.log(data);

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-4 gap-6">

                    {blockData.map((e, index) => (<DataBlock key={index} data={e}/>))}
                    
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="w-full bg-white shadow p-5 rounded-lg">
                        <p className="text-3xl mb-5">Revenue</p>
                        <LineChart label={data?.chart.ChartLabel} data={data?.chart.revenuData}/>
                    </div>
                    <div className="w-full bg-white shadow p-5 rounded-lg">
                        <p className="text-3xl mb-5">Order Summery</p>
                        <BarChart label={data?.chart.ChartLabel} data={data?.chart.orderData}/>
                    </div>
                </div>

                {/* <div className="mt-5 p-5 bg-white shadow-md rounded-xl">
                    <p className="text-3xl">Order List</p>
                    <div className="my-5"></div>
                </div> */}
            </div>
        </>
    )
}

interface ChartData {
    label: string[] | undefined,
    data: number[] | undefined
}

////////////////// component //////////////////////

// Bar chart

function BarChart({label, data}: ChartData) {

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {

            const context = chartRef.current

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: label,
                    datasets: [
                        {
                            label: "Revenu",
                            data,
                            backgroundColor: "rgb(249 115 22)",
                            borderRadius: 5
                        }
                    ]
                }
            })

            return () => {
                newChart.destroy()
            }
        }
    }, [data, label])


    return (
        <>
            <canvas ref={chartRef}/>
        </>
    )
};

// Line chart

function LineChart({label, data}: ChartData) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {

            const context = chartRef.current

            const newChart = new Chart(context, {
                type: "line",
                data: {
                    labels: label,
                    datasets: [
                        {
                            label: "Order",
                            data,
                            backgroundColor: "rgb(249 115 22)",
                            borderColor: 'rgb(249 115 22)',
                            pointRadius: 3,
                        }
                    ]
                }
            })
            return () => {
                newChart.destroy()
            }
        }
    }, [data, label])


    return (
        <>
            <canvas ref={chartRef}/>
        </>
    )
};