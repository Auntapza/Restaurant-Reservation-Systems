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
const token_1 = require("../../function/token");
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient;
router.get('/order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = req.cookies['token'];
    try {
        const payload = (0, token_1.verifyToken)(token);
        if (payload == undefined) {
            throw new Error("Can't find token");
        }
        const userId = payload.userId;
        const order = yield prisma.order.findFirst({
            where: {
                acc_id: Number(userId),
                order_status: 'ordering'
            },
            include: {
                account: true,
                OrderDetail: {
                    include: {
                        Food: true
                    }
                }
            }
        });
        const format = {
            order_id: order === null || order === void 0 ? void 0 : order.order_id,
            table_id: order === null || order === void 0 ? void 0 : order.table_id,
            fullname: ((_a = order === null || order === void 0 ? void 0 : order.account) === null || _a === void 0 ? void 0 : _a.acc_fname) + ' ' + ((_b = order === null || order === void 0 ? void 0 : order.account) === null || _b === void 0 ? void 0 : _b.acc_lname),
            order_date: order === null || order === void 0 ? void 0 : order.order_date,
            service_time: order === null || order === void 0 ? void 0 : order.service_time,
            MenuList: order === null || order === void 0 ? void 0 : order.OrderDetail.map(e => {
                return {
                    food_img: e.Food.food_img,
                    food_name: e.Food.food_name,
                    quantity: e.quantity
                };
            })
        };
        res.json(order ? format : undefined);
    }
    catch (err) {
        const error = err;
        res.status(404).json(undefined);
    }
}));
exports.default = router;
