import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import router from './socket/socket';
import cors from 'cors'
import path from 'path';
import fs from  "fs"

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

app.use('/socket', router);

app.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../upload/test', filename);

    res.sendFile(filePath)

})

io.on('connection', () => {
    console.log("User connected");
})

app.get('/', (req, res) => {
    res.json({
        msg: 'test normal api'
    })
})

server.listen(4000, () => {
    console.log('Now Server running on port 4000');
})