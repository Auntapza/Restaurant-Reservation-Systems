import { PrismaClient } from '@prisma/client';
import express from 'express';
import { createToken } from '../../function/token';
import Crypto from 'crypto'

const router = express();

const prisma = new PrismaClient();

router.post('/', async(req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(403).json({
            msg: "Missing username or password"
        })
    }

    const decryptPassword = Crypto.createHash('sha256').update(password).digest('hex')

    const userData = await prisma.username.findMany({
        where: {
            username,
            password: decryptPassword
        },
        include: {
            Account: true
        }
    })

    if (userData.length === 1) {
        const data = {...userData[0]};
        const payload = {
            userId: data.acc_id,
            Role: data.Account.role
        };
        const token = createToken(payload);
        res.cookie('token', token, {httpOnly: true});
        res.status(200).json({
            msg: 'Login successfully'
        });
    } else {
        res.status(402).json({
            msg: 'username or password incorect'
        });
    }

})

export default router;