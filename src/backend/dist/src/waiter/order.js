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
    const food = yield prisma.food.findMany();
    res.json(food);
}));
router.post('/:tableno', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { tableno } = req.params;
    const food = yield prisma.food.findMany();
    const totalAdd = food.map(e => {
        if (body[e.food_id] > 0) {
            return {
                [e.food_id]: body[e.food_id]
            };
        }
        else {
            return undefined;
        }
    }).filter(e => e != undefined);
    const order = yield prisma.order.findFirst({
        where: {
            table_id: tableno
        },
        orderBy: {
            order_id: 'desc'
        }
    });
    let orderId = order === null || order === void 0 ? void 0 : order.order_id;
    console.log(orderId);
    const addOrder = yield prisma.orderdetail.createMany({
        data: totalAdd.map(e => {
            const [food_id, quantity] = Object.entries(e)[0];
            return {
                order_id: orderId,
                food_id: Number(food_id),
                quantity
            };
        })
    });
    res.json({
        msg: "Place order successfuly"
    });
}));
exports.default = router;
