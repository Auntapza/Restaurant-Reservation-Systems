'use client'

import { Chart } from "chart.js/auto"
import { useEffect, useRef } from "react"

import { Cart, Menu } from "@/img/svg/svg";
import Dashbord from "@/img/dashbord";
import User from "@/img/user";
import DataBlock from "./datablock";

// Mainpage
export default function Mainpage() {

    const blockData = [
        {
            title: 'Total menu',
            value: 260,
            image: <Menu/>
        },
        {
            title: 'Total Order Today',
            value: 5,
            image: <Cart/>
        },
        {
            title: 'Total Client Today',
            value: 240,
            image: <User/>
        },
        {
            title: 'Revenue Ratio',
            value: 10,
            image: <Dashbord/>
        }
        
    ]

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-4 gap-6">

                    {blockData.map((e, index) => (<DataBlock key={index} data={e}/>))}
                    
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="w-full bg-white shadow p-5 rounded-lg">
                        <p className="text-3xl mb-5">Revenue</p>
                        <LineChart/>
                    </div>
                    <div className="w-full bg-white shadow p-5 rounded-lg">
                        <p className="text-3xl mb-5">Order Summery</p>
                        <BarChart/>
                    </div>
                </div>

                <div className="mt-5 p-5 bg-white shadow-md rounded-xl">
                    <p className="text-3xl">Order List</p>
                    <div className="my-5"></div>
                </div>
            </div>
        </>
    )
}

////////////////// component //////////////////////

// Bar chart

function BarChart() {

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {

            const context = chartRef.current

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: ['Monday', 'Tusday', 'Wenday', "Thusday", 'Friday', "Satday", "Sunday"],
                    datasets: [
                        {
                            label: "Income",
                            data: [41, 63, 82, 29, 54, 77, 36],
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
    }, [])


    return (
        <>
            <canvas ref={chartRef}/>
        </>
    )
};

// Line chart

function LineChart() {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {

            const context = chartRef.current

            const newChart = new Chart(context, {
                type: "line",
                data: {
                    labels: ['Monday', 'Tusday', 'Wenday', "Thusday", 'Friday', "Satday", "Sunday"],
                    datasets: [
                        {
                            label: "Income",
                            data: [17, 38, 59, 72, 84, 95],
                            backgroundColor: "rgb(249 115 22)",
                            borderColor: 'rgb(249 115 22)',
                            pointRadius: [0, 0, 0, 0, 0, 3],
                        }
                    ]
                }
            })
            return () => {
                newChart.destroy()
            }
        }
    }, [])


    return (
        <>
            <canvas ref={chartRef}/>
        </>
    )
};