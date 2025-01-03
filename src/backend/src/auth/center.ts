import express from 'express';

import login from './login'
import register from './register'
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import { verifyToken } from '../../function/token';
import { JwtPayload } from 'jsonwebtoken';

const router = express();
const prisma = new PrismaClient;

router.use('/login', login);
router.use('/register', register);

router.use(cookieParser())

router.get('/auth', async(req, res) => {
    
    const token = req.cookies['token'];

    if (token) {

        const tokenPayload = verifyToken(token) as JwtPayload;
        if (tokenPayload) {
            const userData = await prisma.account.findUnique({
                where: {
                    acc_id: Number(tokenPayload.userId)
                }
            })
            if (userData) {
                res.status(200).json(tokenPayload);
                
            } else {
                res.status(402).json({
                    msg: "Can't find user id",
                    token
                });
            }
        } else {
            res.status(402).json({
                msg: "Token is unknow",
                token
            });
        }

    } else {
        res.status(402).json({
            msg: "Can't find token",
            token
        });
    }

})

export default router;