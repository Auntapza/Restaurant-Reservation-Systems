import { PrismaClient } from '@prisma/client';
import express from 'express'
import socket from '../../lib/socket';

const router = express();
const prisma = new PrismaClient();

router.post('/scan', async(req, res) => {

    const { tableid } = req.body;

    try {

        const order = await prisma.order.findFirst({
            where: {
                table_id: tableid,
                order_status: 'pending'
            },
            include: {
                OrderDetail: {
                    include: {
                        Food: true
                    }
                }
            }
        })

        if (!order) {
            throw new Error("Can't find order")
        }

        const updateOrder = await prisma.order.update({
            where: {
                order_id: order.order_id
            },
            data: {
                order_status: 'complete'
            }
        })
        
        if (!updateOrder) {
            throw new Error("Fail to update order")
        } else {
            socket.emit('table update')
            res.json({
                msg: "updateOrder complete",
                orderId: updateOrder.order_id
            })
        }
        
    } catch (err) {
        const error = err as Error
        res.json({
            msg: error.message
        }).status(400)
    }

})


router.post('/cash', async(req, res) => {

    const { amount, tableid } = req.body;

    try {

        const order = await prisma.order.findFirst({
            where: {
                table_id: tableid,
                order_status: 'pending'
            },
            include: {
                OrderDetail: {
                    include: {
                        Food: true
                    }
                }
            }
        })

        if (!order) {
            throw new Error("Can't find order")
        }

        const totalOrderPrice = order.OrderDetail.reduce((sum, e) => {
            return sum + (e.Food.food_price * e.quantity);
        }, 0)

        if (amount < totalOrderPrice) {
            throw new Error("Incorect amount")
        } else {
            const updateOrder = await prisma.order.update({
                where: {
                    order_id: order.order_id
                },
                data: {
                    order_status: 'complete'
                }
            })
            
            if (!updateOrder) {
                throw new Error("Fail to update order")
            } else {
                socket.emit('table update')
                res.json({
                    msg: "updateOrder complete",
                    orderId: updateOrder.order_id
                })
            }
        }
        
    } catch (err) {
        const error = err as Error
        res.json({
            msg: error.message
        }).status(400)
    }

})

export default router;