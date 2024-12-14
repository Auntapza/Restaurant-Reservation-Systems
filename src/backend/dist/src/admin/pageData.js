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
    // totalmenu
    const totalMenu = yield prisma.food.count();
    // Total order
    const totalOrder = yield prisma.order.count();
    // total customer who register
    const totalClient = yield prisma.account.count({
        where: {
            role: "customer"
        }
    });
    /////// use to get order in that Day
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // start at 00:00:00AM
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59); // end at 23:59:59PM
    /////////////////////////////////////
    // Order data for showing Chart
    // get order in past 7 day
    const pastOfToday = todayStart.setDate(today.getDate() - 7);
    const start = new Date(pastOfToday);
    const AllOrder = yield prisma.order.findMany({
        where: {
            order_date: {
                gte: start,
                lte: todayEnd
            }
        },
        include: {
            OrderDetail: {
                include: {
                    Food: true
                }
            }
        }
    });
    let orderData = [];
    let ChartLabel = [];
    for (let i = 0; i < 7; i++) {
        const day = start.setDate(start.getDate() + 1);
        const currentDay = new Date(day);
        const end = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 23, 59, 59);
        let sum = 0;
        AllOrder.map(e => {
            if (e.order_date < end) {
                sum += 1;
            }
        });
        orderData = [...orderData, sum];
        ChartLabel = [...ChartLabel, `${currentDay.getDate()}/${currentDay.getMonth()}/${currentDay.getFullYear()}`];
    }
    // Revenu Data for showing chart && today revenu
    // todayRevenu Code
    const todayOrder = yield prisma.order.findMany({
        where: {
            order_date: {
                gte: todayStart,
                lte: todayEnd
            }
        },
        orderBy: {
            order_id: "desc"
        },
        include: {
            OrderDetail: {
                include: {
                    Food: true
                }
            }
        }
    });
    let todayRevenu = 0;
    todayOrder.map(e => {
        e.OrderDetail.map(e => {
            todayRevenu += (e.Food.food_price * e.quantity);
        });
    });
    // revenu Chart
    let revenuData = [];
    for (let i = 0; i < 7; i++) {
    }
}));
exports.default = router;
