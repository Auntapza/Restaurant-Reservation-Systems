import { PrismaClient } from '@prisma/client';
import express from 'express'

const router = express();
const prisma = new PrismaClient()

router.get('/', async(req, res) => {
    
    const data = await prisma.category.findMany();

    const realData = data.map(e => ({
        catName: e.cat_name,
        catId: e.cat_id
    }))

    res.json(realData);

})

export default router