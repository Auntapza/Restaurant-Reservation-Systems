import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express();
const prisma = new PrismaClient();

router.get('/', async(req, res) => {
    // totalmenu
    const totalMenu = await prisma.food.count();
    // Total order
    const totalOrder = await prisma.order.count();
    // total customer who register
    const totalClient = await prisma.account.count({
        where: {
            role: "customer"
        }
    })

    /////// use to get order in that Day
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // start at 00:00:00AM
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59); // end at 23:59:59PM
    /////////////////////////////////////

    // Order data for showing Chart

        // get order in past 7 day
        const pastOfToday = todayStart.setDate(today.getDate()-7)
        const start = new Date(pastOfToday);
    const AllOrder = await prisma.order.findMany({
        where :{
            order_date: {
                gte: start,
                lte: todayEnd
            }
        },
        include: {
            OrderDetail: {
                include: {
                    Food: true
                }
            }
        }
    });

    let orderData:number[] = []
    let ChartLabel:string[] = []
    for(let i = 0; i < 7; i++) {

        const day = start.setDate(start.getDate() + 1);
        const currentDay = new Date(day);
        const end = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 23, 59, 59);
        let sum = 0
        AllOrder.map(e => {
            if (e.order_date < end) {
                sum += 1
            }
        })

        orderData = [...orderData, sum];
        ChartLabel = [...ChartLabel, `${currentDay.getDate()}/${currentDay.getMonth()}/${currentDay.getFullYear()}`]

    }
    
    
    // Revenu Data for showing chart && today revenu

        // todayRevenu Code
    const todayOrder = await prisma.order.findMany({
        where: {
            order_date: {
                gte: todayStart,
                lte: todayEnd
            }
        },
        orderBy: {
            order_id: "desc"
        },
        include: {
            OrderDetail: {
                include: {
                    Food: true
                }
            }
        }
    })

    let todayRevenu = 0

    todayOrder.map(e => {
        e.OrderDetail.map(e=> {
            todayRevenu += (e.Food.food_price * e.quantity);
        })
    })

        // revenu Chart
    
    let revenuData:number[] = [];

    for(let i = 0; i < 7; i++) {
        
    }


})

export default router