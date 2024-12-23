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
const getFood_1 = __importDefault(require("./src/user/getFood"));
const center_1 = __importDefault(require("./src/admin/center"));
const client_1 = require("@prisma/client");
const center_2 = __importDefault(require("./src/img/center"));
const socket_2 = __importDefault(require("./socket/socket"));
const center_3 = __importDefault(require("./src/auth/center"));
const cart_1 = __importDefault(require("./src/user/cart"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});
const prisma = new client_1.PrismaClient;
app.use('/socket', socket_1.default);
app.use('/app', getFood_1.default);
app.use('/admin', center_1.default);
app.use('/image', center_2.default);
app.use('/', socket_2.default);
app.use('/', center_3.default);
app.use('/cart', cart_1.default);
io.on('connection', (socket) => {
    console.log("User connected");
    socket.on('table update', (tableId, tableStatus) => {
        if (tableId && tableStatus) {
            prisma.table.update({
                where: {
                    table_id: tableId
                },
                data: {
                    table_status: tableStatus
                }
            });
        }
    });
});
server.listen(4000, () => {
    console.log('Now Server running on port 4000');
});
