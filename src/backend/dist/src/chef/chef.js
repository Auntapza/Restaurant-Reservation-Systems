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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma.order.findMany({
        where: {
            AND: [
                {
                    OrderDetail: {
                        some: {
                            complete: 'none'
                        }
                    }
                },
                {
                    order_status: {
                        not: 'complete'
                    }
                }
            ]
        },
        select: {
            order_id: true,
            table_id: true,
            order_status: true,
            service_time: true,
            OrderDetail: {
                select: {
                    Food: {
                        select: {
                            food_id: true,
                            food_name: true
                        }
                    },
                    quantity: true
                }
            }
        },
        orderBy: {
            modifyTime: 'asc'
        }
    });
    const reservationCondition = order.filter(e => {
        if (e.order_status == "ordering") {
            const now = new Date();
            const orderTime = new Date(e.service_time).getTime();
            return (eval(`${orderTime} - ${now.getTime()}`) <= 1800000);
        }
        else if (e.order_status == "pending") {
            return true;
        }
        else {
            return false;
        }
    });
    const transformedData = reservationCondition.map((e) => {
        return {
            order_id: e.order_id,
            table: e.table_id,
            time: e.service_time,
            status: e.order_status,
            foodList: e.OrderDetail.map(e => ({
                foodId: e.Food.food_id,
                foodName: e.Food.food_name,
                foodQuantity: e.quantity
            }))
        };
    });
    res.json(transformedData);
}));
router.put('/:orderId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const update = yield prisma.order.update({
        where: {
            order_id: Number(orderId)
        },
        data: {
            OrderDetail: {
                updateMany: {
                    where: {
                        order_id: Number(orderId)
                    },
                    data: {
                        complete: 'waitServe'
                    }
                }
            },
            modifyTime: new Date()
        }
    });
    res.json({
        msg: 'Complete task!'
    });
}));
exports.default = router;
