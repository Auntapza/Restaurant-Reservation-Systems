import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express();
const prisma = new PrismaClient

router.get('/', async(req, res) => {
    
    const tableStatus = await prisma.table.findMany({
        include: {
            order: {
                orderBy: {
                    order_date: 'desc'
                }
            }
        }
    });

    const data = tableStatus.map((e) => {
        if (e.order.length > 0) {
            const order = e.order[0];
            let status = 0;
            if (order.order_status == "ordering") {
                status = 2;
            } else if (order.order_status == "pending") {
                status = 1;
            } else if (order.order_status == "complete") {
                status = 0
            }
            
            return {
                tableId: e.table_id,
                status: status
            }
        } else {
            return {
                tableId: e.table_id,
                status: 0
            }
        }
    })

    res.json(data)

})

export default router