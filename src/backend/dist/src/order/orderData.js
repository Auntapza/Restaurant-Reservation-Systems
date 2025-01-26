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
const role_1 = __importDefault(require("../../function/role"));
const client_1 = require("@prisma/client");
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
router.get('/reservation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, role_1.default)(req, "cashier")) {
            throw new Error("Don't have permission");
        }
        else {
            const data = yield prisma.order.findMany({
                where: {
                    order_status: 'ordering'
                },
                select: {
                    account: {
                        select: {
                            acc_fname: true,
                            acc_lname: true
                        }
                    },
                    OrderDetail: {
                        select: {
                            Food: {
                                select: {
                                    food_name: true,
                                    food_price: true,
                                    food_img: true
                                }
                            }
                        }
                    }
                }
            });
            const format = data.map(e => {
                var _a, _b;
                const foodList = e.OrderDetail.map(e => ({
                    foodName: e.Food.food_name,
                    foodPrice: e.Food.food_price,
                    foodImg: e.Food.food_img
                }));
                return {
                    customerName: `${(_a = e.account) === null || _a === void 0 ? void 0 : _a.acc_fname}  ${(_b = e.account) === null || _b === void 0 ? void 0 : _b.acc_lname}`,
                    foodList,
                    totalPrice: e.OrderDetail.reduce((acc, order) => acc + order.Food.food_price, 0)
                };
            });
            res.json(format);
        }
    }
    catch (err) {
        const error = err;
        res.status(400).json({
            msg: error.message
        });
    }
}));
exports.default = router;
