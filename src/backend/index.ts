import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import router from './socket/socket';
import cors from 'cors'

import getFood from './src/user/getFood';
import adminApi from './src/admin/center'
import { PrismaClient, table_table_status } from '@prisma/client';
import imageShow from './src/img/center'
import testImage from './socket/socket'
import auth from './src/auth/center'
import table from './src/table/table'
import cart from './src/user/cart'

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({
    limit: "50mb"
}));

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
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
// app.use('/', testImage)

io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('table update', async(tableId:string, tableStatus:table_table_status) => {
        if (tableId && tableStatus) {
            prisma.table.update({
                where: {
                    table_id: tableId
                },
                data: {
                    table_status: tableStatus
                }
            })
            const tableData = await prisma.table.findMany();

            
            socket.emit("table update", tableData.map(e => ({
                tableId: e.table_id,
                status: e.table_status
            })))

        }
    })
})

server.listen(4000, () => {
    console.log('Now Server running on port 4000');
})