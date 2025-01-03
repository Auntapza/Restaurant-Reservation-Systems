"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const center_3 = __importDefault(require("./src/auth/center"));
const table_1 = __importDefault(require("./src/table/table"));
const cart_1 = __importDefault(require("./src/user/cart"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json({
    limit: "50mb"
}));
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});
const prisma = new client_1.PrismaClient;
app.use('/socket', socket_1.default);
app.use('/app', getFood_1.default);
app.use('/admin', center_1.default);
app.use('/image', center_2.default);
app.use('/', center_3.default);
app.use('/cart', cart_1.default);
app.use('/table', table_1.default);
// app.use('/', testImage)
io.on('connection', (socket) => {
    console.log("User connected");
    socket.on('table update', (tableId, tableStatus) => __awaiter(void 0, void 0, void 0, function* () {
        if (tableId && tableStatus) {
            prisma.table.update({
                where: {
                    table_id: tableId
                },
                data: {
                    table_status: tableStatus
                }
            });
            const tableData = yield prisma.table.findMany();
            socket.emit("table update", tableData.map(e => ({
                tableId: e.table_id,
                status: e.table_status
            })));
        }
    }));
});
server.listen(4000, () => {
    console.log('Now Server running on port 4000');
});
