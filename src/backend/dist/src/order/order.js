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
const token_1 = require("../../function/token");
const client_1 = require("@prisma/client");
const checkSlip_1 = __importDefault(require("../../function/checkSlip"));
const socket_1 = __importDefault(require("../../lib/socket"));
const orderData_1 = __importDefault(require("./orderData"));
const tableOrder_1 = __importDefault(require("./tableOrder"));
const pay_1 = __importDefault(require("./pay"));
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
router.use('/', orderData_1.default);
router.use('/table', tableOrder_1.default);
router.use('/pay', pay_1.default);
// reservation adding
router.post('/reservation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tableId, foodList, reservationData, time } = req.body;
        const token = req.cookies['token'];
        const currentTime = new Date();
        const serviceTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), Number(time.split(":")[0]), Number(time.split(":")[1]), 0);
        console.log(serviceTime);
        const { userId } = (0, token_1.verifyToken)(token);
        if (reservationData.slip_img) {
            const slipOkRes = yield (0, checkSlip_1.default)(reservationData.slip_img, 20);
            if (slipOkRes.status == 400) {
                throw new Error(slipOkRes.msg);
            }
            if (tableId || foodList) {
                const createdData = yield prisma.order.create({
                    data: {
                        acc_id: Number(userId),
                        order_status: "ordering",
                        service_time: serviceTime,
                        payment: {
                            create: {
                                status: "paid",
                                pay_count: reservationData.price,
                                slip_image: slipOkRes.imagePath,
                                pay_time: new Date(),
                                method: "promptpay"
                            }
                        },
                        OrderDetail: {
                            createMany: {
                                data: foodList.map(e => ({ food_id: e.foodId, quantity: e.quantity }))
                            }
                        },
                        table_id: tableId,
                    }
                });
                if (createdData) {
                    socket_1.default.emit("order update");
                    res.json({
                        slipData: slipOkRes.slipOkData,
                        order: createdData
                    });
                }
                else {
                    res.status(403).json({
                        msg: 'Create Reservation fail'
                    });
                }
            }
            else {
                throw new Error("Missing Data");
            }
        }
        else {
            throw new Error("Can't Find Slip Image");
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err);
            res.status(403).json({
                msg: err.message
            });
        }
        else {
            res.status(400).json({
                msg: "Unexpect Error"
            });
        }
    }
}));
router.post('/walkin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token'];
    const { tableId } = req.body;
    try {
        if (!tableId) {
            throw new Error("Missing Data");
        }
        const payload = (0, token_1.verifyToken)(token);
        if (payload == undefined) {
            throw new Error("Missing token");
        }
        if (payload.Role === "cashier") {
            const newOrder = yield prisma.order.create({
                data: {
                    order_status: "pending",
                    table: {
                        connect: {
                            table_id: tableId
                        }
                    }
                }
            });
            socket_1.default.emit("table update");
            res.status(201).json({
                msg: "Order Created!",
                createdData: newOrder
            });
        }
        else {
            throw new Error("Don't have permission");
        }
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            msg: err.message
        });
    }
}));
router.post('/checkin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token'];
    const { tableId } = req.body;
    try {
        const payload = (0, token_1.verifyToken)(token);
        if (payload == undefined) {
            throw new Error("Missing token");
        }
        if (!tableId) {
            throw new Error("Missing Data");
        }
        if (payload.Role === "cashier") {
            const updatedOrder = yield prisma.order.updateMany({
                where: {
                    table_id: tableId
                },
                data: {
                    order_status: 'pending'
                }
            });
            socket_1.default.emit("table update");
            socket_1.default.emit("order update");
            res.status(200).json({
                msg: "Order Updated",
                createdData: updatedOrder
            });
        }
        else {
            throw new Error("Don't have permission");
        }
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            msg: err.message
        });
    }
}));
exports.default = router;
