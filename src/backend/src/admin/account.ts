import { PrismaClient } from '@prisma/client';
import Crypto from 'crypto'
import express from 'express';

const router = express();

const prisma = new PrismaClient();

// get all worker Data

router.get('/', async(req, res) => {
    
    const data = await prisma.account.findMany()

    res.status(200).json(data)

})

// get worker Data by id
router.get('/:userId', async(req, res) => {
    
    const { userId } = req.params;

    const data = await prisma.account.findUnique({
        where: {
            acc_id: Number(userId)
        },
        include: {
            Username: true
        }
    })

    res.status(200).json(data)

})

// insert new worker Data
router.post('/', async(req, res) => {

    const { username, password, fname, lname, role } = req.body;
    
    const hashPassword = Crypto.createHash('sha256').update(password).digest('hex')
    

    const createdData = await prisma.account.create({
        data: {
            acc_fname: fname,
            acc_lname: lname,
            role,
            Username: {
                create: {
                    username,
                    password: hashPassword
                }
            }
        },
        include: {
            Username: true
        }
    })

    res.status(201).json({
        msg: 'New worker added!',
        data: createdData
    })

})

// update worker data
router.put('/:userId', async(req, res) => {
    
    const { fname, lname, role } = req.body;
    const { userId } = req.params

    const updatedData = await prisma.account.update({
        where: {
            acc_id: Number(userId)
        },
        data: {
            acc_fname: fname,
            acc_lname: lname,
            role
        }
    })

    res.status(202).json({
        msg: 'Update Worker Data successfuly',
        data: updatedData
    })

})

// delete worker Data
router.delete('/:userId', async(req, res) => {
    
    const { userId } = req.params;

    const deletedData = await prisma.account.delete({
        where: {
            acc_id: Number(userId)
        }
    })

    res.status(202).json({
        msg: "Delete Data successfuly",
        deletedData
    })

})

export default router