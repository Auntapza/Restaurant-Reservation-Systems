import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import router from './socket/socket';
import cors from 'cors'
import path from 'path';

import getFood from './src/user/getFood';
import adminApi from './src/admin/pageData'
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(cors());

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

app.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../upload/test', filename);

    res.sendFile(filePath)

})

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

app.get('/', (req, res) => {
    res.json({
        msg: 'test normal api'
    })
})

server.listen(4000, () => {
    console.log('Now Server running on port 4000');
})