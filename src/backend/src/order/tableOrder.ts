import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express();
const prisma = new PrismaClient();

router.get('/:tableno', async(req, res) => {

    const { tableno } = req.params;

    const tableOrder = await prisma.table.findUnique({
        where: {
            table_id: tableno as string
        },
        include: {
            order: {
                where: {
                    order_status: 'pending'
                },
                include: {
                    OrderDetail: {
                        include: {
                            Food: true
                        }
                    }
                }
            }
        }
    })

    res.json(tableOrder?.order[0]);

})

export default router;