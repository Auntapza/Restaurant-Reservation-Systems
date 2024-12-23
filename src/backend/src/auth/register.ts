import { PrismaClient } from '@prisma/client';
import express from 'express';
import Crypto from 'crypto'

const router = express();

const prisma = new PrismaClient();

router.post('/', async(req, res) => {

    const { fname, lname, username, password } = req.body;

    const hashPassword = Crypto.createHash('sha256').update(password).digest('hex')

    if (fname && lname && username && password) {
        const allUsername = await prisma.username.count({
            where: {
                username
            }
        })

        if (allUsername <= 0) {
            const createdData = await prisma.account.create({
                data: {
                    acc_fname: fname,
                    acc_lname: lname,
                    role: 'customer',
                    Username: {
                        create : {
                            username,
                            password: hashPassword
                        }
                    }
                }
            });

            if (createdData) {
                res.status(201).json({
                    msg: 'Create data successfuly'
                });
            } else {
                res.status(403).json({
                    msg: 'fail to create data'
                });
            }
        } else {
            res.status(403).json({
                msg: 'Username has already takend'
            })
        }

    } else {
        res.status(403).json({
            msg: 'missing data'
        });
    }


})

export default router;