"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./socket/socket"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});
app.use('/socket', socket_1.default);
app.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path_1.default.join(__dirname, '../upload/test', filename);
    res.sendFile(filePath);
});
io.on('connection', () => {
    console.log("User connected");
});
app.get('/', (req, res) => {
    res.json({
        msg: 'test normal api'
    });
});
server.listen(4000, () => {
    console.log('Now Server running on port 4000');
});
