import { PrismaClient } from '@prisma/client';
import express from 'express'

const router = express();
const prisma = new PrismaClient();

router.get('/', async(req, res) => {

    try {

        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
        const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

        const rawData = await prisma.order.findMany({
            where: {
                order_date: {
                    gte: start,
                    lte: end
                }
            },include: {
                OrderDetail: {
                    include: {Food: true}
                }
            }
        })

        const order = rawData.filter(e => e.order_status == "complete")
        const orderPending = rawData.map(e => {
            const menu = e.OrderDetail.filter(e => {
                return e.complete == 'waitServe'
            })

            if (menu.length < 1) {
                return undefined
            } else {
                return {...e, OrderDetail: menu}
            }
        })

        res.json({
            totalOrder: order.length,
            totalClient: rawData.length,
            order: orderPending.filter(e => e != undefined)
        })
    } catch (err) {
        const error = err as Error;
        res.status(400).json({
            msg: error.message
        })
    }

})

router.post('/:orderId', async(req, res) => {

    try {
        const { orderId } = req.params;

        const update = await prisma.orderdetail.updateMany({
            where: {
                order_id: Number(orderId)
            },
            data: {
                complete: 'complete'
            }
        })
    
        if (update) {
            res.json({
                msg: "Complete Task"
            })
        } else {
            res.status(400).json({
                msg: "Error to complete Task"
            })
        }
    } catch (err) {

        const error = err as Error

        console.log(error);
        

        res.status(400).json({
            msg: error.message
        })
    }
    
})

export default router