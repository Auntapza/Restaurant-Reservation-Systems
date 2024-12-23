import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import router from './socket/socket';
import cors from 'cors'

import getFood from './src/user/getFood';
import adminApi from './src/admin/center'
import { PrismaClient } from '@prisma/client';
import imageShow from './src/img/center'
import testImage from './socket/socket'
import auth from './src/auth/center'
import cart from './src/user/cart'

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }

});

const prisma = new PrismaClient

app.use('/socket', router);
app.use('/app', getFood);
app.use('/admin', adminApi);
app.use('/image', imageShow);
app.use('/', testImage)
app.use('/', auth)
app.use('/cart', cart)

io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('table update', (tableId:string, tableStatus) => {
        if (tableId && tableStatus) {
            prisma.table.update({
                where: {
                    table_id: tableId
                },
                data: {
                    table_status: tableStatus
                }
            })
        }
    })
})

server.listen(4000, () => {
    console.log('Now Server running on port 4000');
})