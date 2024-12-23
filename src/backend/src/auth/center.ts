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
        if (tokenPayload.Role === 'customer') {
            res.status(200).json(tokenPayload);
        } else {
            res.status(401).json({token});
        }
    } else {
        res.status(401).json({token});
    }

})

export default router;