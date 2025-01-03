import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express();
const prisma = new PrismaClient

router.get('/', async(req, res) => {
    
    const tableStatus = await prisma.table.findMany();

    const convertToNumber = (text:string) => {
        if (text === 'busy') {
            return 1;
        } else if (text === 'ordered') {
            return 2;
        } else if (text === "idle") {
            return 0;
        }
    }

    res.json(tableStatus.map(e => ({
        tableId: e.table_id,
        status: convertToNumber(e.table_status)
    })))

})

export default router