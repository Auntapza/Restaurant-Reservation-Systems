import { PrismaClient } from '@prisma/client';
import express from 'express';
import fs from 'fs'
import path from 'path';

const router = express();
router.use(express.json({limit: '100mb'}))

const prisma = new PrismaClient();


// get all food Data
router.get('/', async(req, res) => {
    
    const data = await prisma.food.findMany();
    const category = await prisma.category.findMany();

    res.json({
        foodList: data.map(e => ({
            foodId: e.food_id,
            foodImg: e.food_img,
            foodPrice: e.food_price,
            foodName: e.food_name,
            catId: e.cat_id
        })),
        category: category.map(e => ({
            catId: e.cat_id,
            catName: e.cat_name
        }))
    });

})

// get food data by id
router.get('/:foodId', async(req, res) => {

    const { foodId } = req.params;

    const data = await prisma.food.findUnique({
        where: {
            food_id: Number(foodId)
        }
    })

    if (data) {
        res.json({
            foodId: data?.food_id,
            foodImg: data?.food_img,
            foodPrice: data?.food_price,
            foodName: data?.food_name,
            catId: data.cat_id
        });
    } else {
        res.status(403).json({
            msg: `Can't find food by this id (${foodId})`
        })
    }
 
})

//insert new food Data
router.post('/', async(req, res) => {

    const { foodName, foodPrice, catId, foodImg } = req.body;
    
    let createdData

    if (foodImg) {
        const base64Data = foodImg.replace(/^data:image\/\w+;base64,/, '');

        const name = Date.now();
        
        const filePath = `./upload/food/${name}.png`
        fs.writeFileSync(filePath, base64Data, {encoding: 'base64'});
        const foodImgPath = `http://localhost:4000/image/food/${name}.png`;
        createdData = await prisma.food.create({
            data: {
                food_name: foodName,
                food_price: Number(foodPrice),
                cat_id: Number(catId),
                food_img: foodImgPath
            }
        })
    } else {
        createdData = await prisma.food.create({
            data: {
                food_name: foodName,
                food_price: Number(foodPrice),
                cat_id: Number(catId)
            }
        })
    }

    res.status(201).json({
        msg: "Create Data successfuly",
        data: createdData
    })

})


// update food data
router.put('/:foodId', async(req, res) => {
    
    const { foodName, foodPrice, catId, foodImg } = req.body;
    const { foodId } = req.params;

    let createdData

    if (foodImg) {
        const base64Data = foodImg.replace(/^data:image\/\w+;base64,/, '');

        const name = Date.now();
        
        const filePath = `./upload/food/${name}.png`
        fs.writeFileSync(filePath, base64Data, {encoding: 'base64'});
        const foodImgPath = `http://localhost:4000/image/food/${name}.png`;
        createdData = await prisma.food.update({
            data: {
                food_name: foodName,
                food_price: Number(foodPrice),
                cat_id: Number(catId),
                food_img: foodImgPath
            },
            where: {
                food_id: Number(foodId)
            }
        })
    } else {
        createdData = await prisma.food.update({
            data: {
                food_name: foodName,
                food_price: Number(foodPrice),
                cat_id: Number(catId)
            },
            where: {
                food_id: Number(foodId)
            }
        })
    }

    res.status(201).json({
        msg: "Update Data successfully",
        data: createdData
    })

})

// delete food
router.delete('/:foodId', async(req, res) => {
    
    const { foodId } = req.params;
    
    const deletedData = await prisma.food.delete({
        where: {
            food_id: Number(foodId)
        }
    });

    res.status(203).json({
        msg: "Delete data successfuly",
        dataDelete: deletedData
    });

})

export default router