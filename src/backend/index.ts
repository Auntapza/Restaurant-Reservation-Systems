import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import router from './socket/socket';
import cors from 'cors'

import getFood from './src/user/getFood';
import adminApi from './src/admin/center'
import { PrismaClient } from '@prisma/client';
import imageShow from './src/img/center'
import auth from './src/auth/center'
import waiter from './src/waiter/center'
import table from './src/table/table'
import cart from './src/user/cart'
import order from './src/order/order'
import axios from 'axios';
import chef from './src/chef/chef'
import user from './src/user/order'

const app = express();
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.json({
    limit: "50mb"
}));

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
    }
});

const prisma = new PrismaClient

app.use('/socket', router);
app.use('/app', getFood);
app.use('/admin', adminApi);
app.use('/image', imageShow);
app.use('/', auth);
app.use('/cart', cart);
app.use('/table', table);
app.use('/order', order)
app.use('/chef', chef)
app.use('/waiter', waiter)
app.use('/user', user)
// app.use('/', testImage)

io.on('connection', (socket) => {

    socket.on("test", (msg) => {
        io.emit('test', msg)
    })

    socket.on('table update', async() => {
        const res = await axios.get("http://localhost:4000/table")
        const data = res.data
        
        io.emit('table update', data)

    })

    socket.on("order update", async() => {
        const res = await axios.get("http://localhost:4000/chef")
        const data = res.data
        
        io.emit('order update', data)
    })

})

const interval = setInterval(async() => {

    io.emit('order update')

    const order = await prisma.order.findMany({
        where: {
            order_status: 'ordering'
        }
    })

    const LateOrder = order.map(e => {
        const now = new Date().getTime();
        const serviceTime = new Date(e.service_time).getTime();

        if (now - serviceTime >= (1000 * 60 * 60)) {
            return e.order_id
        } else {
            return undefined
        }        
    }).filter(e => e != undefined)

    if (LateOrder.length >= 1) {
        console.log(LateOrder[0]);
        await prisma.order.update({
            where: {
                order_id: LateOrder[0]
            },
            data: {
                order_status: 'cancel'
            }
        })
    }

}, (1000))

server.listen(4000, () => {
    console.log('Now Server running on port 4000');
})