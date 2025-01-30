import { PrismaClient } from '@prisma/client';
import express from 'express'

const router = express();
const prisma = new PrismaClient();

router.get('/', async(req, res) => {

    const food = await prisma.food.findMany()

    res.json(food)

})

router.post('/:tableno', async(req, res) => {

    const body = req.body;
    const {tableno} = req.params;

    const food = await prisma.food.findMany();

    const totalAdd = food.map(e => {
        if (body[e.food_id] > 0) {
            return {
                [e.food_id]: body[e.food_id]
            }
        } else {
            return undefined
        }
    }).filter(e => e != undefined);

    const order = await prisma.order.findFirst({
        where: {
            table_id: tableno
        },
        orderBy: {
            order_id: 'desc'
        }
    })

    let orderId = order?.order_id as number
    console.log(orderId);

    const addOrder = await prisma.orderdetail.createMany({
        data: totalAdd.map(e => {
            const [food_id, quantity] = Object.entries(e)[0]
            return {
                order_id: orderId,
                food_id: Number(food_id),
                quantity
            }
        })
    })

    res.json({
        msg: "Place order successfuly"
    })

})

export default router