import { PrismaClient } from '@prisma/client';
import express from 'express'
import { verifyToken } from '../../function/token';
import { JwtPayload } from 'jsonwebtoken';

const router = express();
const prisma = new PrismaClient

router.get('/order', async(req, res) => {
    
    const token = req.cookies['token'];

    try {
        const payload = verifyToken(token) as JwtPayload;
        if (payload == undefined) {
            throw new Error("Can't find token")
        } 
        const userId = payload.userId

        const order = await prisma.order.findFirst({
            where: {
                acc_id: Number(userId),
                order_status: 'ordering'
            },
            include: {
                account: true,
                OrderDetail: {
                    include: {
                        Food: true
                    }
                }
            }
        })

        const format = {
            order_id: order?.order_id,
            table_id: order?.table_id,
            fullname: order?.account?.acc_fname + ' ' + order?.account?.acc_lname,
            order_date: order?.order_date,
            service_time: order?.service_time,
            MenuList: order?.OrderDetail.map(e => {
                return {
                    food_img: e.Food.food_img,
                    food_name: e.Food.food_name,
                    quantity: e.quantity
                }
            })      
        }

        res.json(order ? format : undefined)

    } catch (err) {
        const error = err as Error
        res.status(404).json(undefined)
    }

})


export default router