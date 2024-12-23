import { PrismaClient } from '@prisma/client';
import express from 'express';
const router = express()


const prisma = new PrismaClient

// /app
router.get('/foodList', async(req, res) => {

    const { search } = req.query;

    const allFood = await prisma.food.findMany({
        include: {
            Rating: true
        },
        where: {
            food_name:{
                contains: search as string
            }
        }
    });

    const foodFormat = allFood.map(e => {

        let sum = 0
        e.Rating.map(e => {
            sum += e.score
        })

        const avg = (sum/e.Rating.length).toFixed(1)
        
        return {
            foodId: e.food_id,
            foodName: e.food_name,
            foodPrice: e.food_price,
            foodImg: e.food_img,
            catId: e.cat_id,
            rate_score: avg,
        }
    })

    res.status(200).json(foodFormat);

})

export default router