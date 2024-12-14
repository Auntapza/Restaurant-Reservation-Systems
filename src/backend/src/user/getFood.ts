import { PrismaClient } from '@prisma/client';
import express from 'express';
const router = express()


const prisma = new PrismaClient

// /app
router.get('/foodList', async(req, res) => {

    const allFood = await prisma.food.findMany({
        include: {
            Rating: true
        }
    });

    const foodFormat = allFood.map(e => {

        let sum = 0
        const loop = e.Rating.map(e => {
            sum += e.score
        })

        const avg = (sum/e.Rating.length).toFixed(1)
        
        return {
            foodId: e.food_id,
            foodName: e.food_name,
            foodPrice: e.food_price,
            rate_score: avg,
        }
    })

    res.status(200).json(foodFormat);

})

// app/cartList
router.get('/cartList/:userid', async(req, res) => {

    const { userid } = req.params
    
    const cartList = await prisma.cart.findUnique({
        where: {
            acc_id: Number(userid)
        },
        include: {
            CartDetail: {
                include: {
                    Food: true
                }
            }
        }
    })

    const format = cartList?.CartDetail.map(e => {
        return {
            foodId: e.Food.food_id,
            foodName: e.Food.food_name,
            foodImg: e.Food.food_img,
            foodPrice: e.Food.food_price,
            quantity: e.quantity
        }
    })

    res.status(200).json({
        cartList: format
    })

})

export default router