import { PrismaClient } from '@prisma/client';
import express from 'express'

const router = express();
const prisma = new PrismaClient();

router.get("/", async(req, res) => {

    const order = await prisma.order.findMany({
        where: {
            AND: [
                {
                    OrderDetail: {
                        some: {
                            complete: 'none'
                        }
                    }
                },
                {
                    order_status: {
                        not: 'complete'
                    }
                }
            ]
        },
        select: {
            order_id: true,
            table_id: true,
            order_status: true,
            service_time: true,
            OrderDetail: {
                select: {
                    Food: {
                        select: {
                            food_id: true,
                            food_name: true
                        }
                    },
                    quantity: true
                }
            }
        },
        orderBy: {
            modifyTime: 'asc'
        }
    })

    const reservationCondition = order.filter(e => {
        
        if (e.order_status == "ordering") {
            const now = new Date();
            const orderTime = new Date(e.service_time).getTime();
            return (eval(`${orderTime} - ${now.getTime()}`) <= 1800000)
        } else if (e.order_status == "pending") {
            return true;
        } else {
            return false
        }

    })

    const transformedData = reservationCondition.map((e) => {
        return {
            order_id: e.order_id,
            table: e.table_id,
            time: e.service_time,
            status: e.order_status,
            foodList: e.OrderDetail.map(e => ({
                foodId: e.Food.food_id,
                foodName: e.Food.food_name,
                foodQuantity: e.quantity
            }))
        }
    })
    
    res.json(transformedData)

})

router.put('/:orderId', async(req, res) => {

    const {orderId} = req.params;

    const update = await prisma.order.update({
        where: {
            order_id: Number(orderId)
        },
        data: {
            OrderDetail: {
                updateMany: {
                    where: {
                        order_id: Number(orderId)
                    },
                    data: {
                        complete: 'waitServe'
                    }
                }
            },
            modifyTime: new Date()
        }
    })
    
    res.json({
        msg: 'Complete task!'
    })

})

export default router