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
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const rawData = yield prisma.order.findMany({
            where: {
                order_date: {
                    gte: start,
                    lte: end
                }
            }, include: {
                OrderDetail: {
                    include: { Food: true }
                }
            }
        });
        const order = rawData.filter(e => e.order_status == "complete");
        const orderPending = rawData.map(e => {
            const menu = e.OrderDetail.filter(e => {
                return e.complete == 'waitServe';
            });
            if (menu.length < 1) {
                return undefined;
            }
            else {
                return Object.assign(Object.assign({}, e), { OrderDetail: menu });
            }
        });
        res.json({
            totalOrder: order.length,
            totalClient: rawData.length,
            order: orderPending
            // account: {
            //     fullname: `${accountData?.acc_fname} ${accountData?.acc_lname}`
            // }
        });
    }
    catch (err) {
        const error = err;
        res.status(400).json({
            msg: error.message
        });
    }
}));
exports.default = router;
