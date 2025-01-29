import express from 'express'
import role from '../../function/role';
import { PrismaClient } from '@prisma/client';

const router = express();
const prisma = new PrismaClient();

router.get('/reservation', async(req, res) => {
    
    try {
        
        if (!role(req, "cashier")) {
            throw new Error("Don't have permission")
        } else {
            const data = await prisma.order.findMany({
                where: {
                    order_status: 'ordering'
                },
                select: {
                    account: {
                        select: {
                            acc_fname: true,
                            acc_lname: true
                        }
                    },
                    OrderDetail: {
                        select: {
                            Food: {
                                select: {
                                    food_name: true,
                                    food_price: true,
                                    food_img: true
                                }
                            }
                        }
                    }
                }
            })
        
            const format = data.map(e => {

                const foodList = e.OrderDetail.map(e => ({
                    foodName: e.Food.food_name,
                    foodPrice: e.Food.food_price,
                    foodImg: e.Food.food_img
                }))

                return {
                    customerName: `${e.account?.acc_fname}  ${e.account?.acc_lname}`,
                    foodList,
                    totalPrice: e.OrderDetail.reduce((acc, order) => acc + order.Food.food_price, 0)
                }
            })

            res.json(format)

        }

    } catch (err) {
        const error = err as Error
        res.status(400).json({
            msg: error.message
        })
    }
    
})

router.get('/:orderid', async(req, res) => {

    const { orderid } = req.params;

    const orderData = await prisma.order.findUnique({
        where: {
            order_id: Number(orderid)
        },
        include: {
            OrderDetail: {
                include: {
                    Food: true
                }
            },
        }
    })

    res.json(orderData)

})

export default router