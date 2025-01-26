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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const socket_1 = __importDefault(require("../../lib/socket"));
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
router.post('/scan', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tableid } = req.body;
    try {
        const order = yield prisma.order.findFirst({
            where: {
                table_id: tableid,
                order_status: 'pending'
            },
            include: {
                OrderDetail: {
                    include: {
                        Food: true
                    }
                }
            }
        });
        if (!order) {
            throw new Error("Can't find order");
        }
        const updateOrder = yield prisma.order.update({
            where: {
                order_id: order.order_id
            },
            data: {
                order_status: 'complete'
            }
        });
        if (!updateOrder) {
            throw new Error("Fail to update order");
        }
        else {
            socket_1.default.emit('table update');
            res.json({
                msg: "updateOrder complete",
                orderId: updateOrder.order_id
            });
        }
    }
    catch (err) {
        const error = err;
        res.json({
            msg: error.message
        }).status(400);
    }
}));
router.post('/cash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, tableid } = req.body;
    try {
        const order = yield prisma.order.findFirst({
            where: {
                table_id: tableid,
                order_status: 'pending'
            },
            include: {
                OrderDetail: {
                    include: {
                        Food: true
                    }
                }
            }
        });
        if (!order) {
            throw new Error("Can't find order");
        }
        const totalOrderPrice = order.OrderDetail.reduce((sum, e) => {
            return sum + (e.Food.food_price * e.quantity);
        }, 0);
        if (amount < totalOrderPrice) {
            throw new Error("Incorect amount");
        }
        else {
            const updateOrder = yield prisma.order.update({
                where: {
                    order_id: order.order_id
                },
                data: {
                    order_status: 'complete'
                }
            });
            if (!updateOrder) {
                throw new Error("Fail to update order");
            }
            else {
                socket_1.default.emit('table update');
                res.json({
                    msg: "updateOrder complete",
                    orderId: updateOrder.order_id
                });
            }
        }
    }
    catch (err) {
        const error = err;
        res.json({
            msg: error.message
        }).status(400);
    }
}));
exports.default = router;
