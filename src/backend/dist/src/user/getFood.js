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
const prisma = new client_1.PrismaClient;
// /app
router.get('/foodList', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allFood = yield prisma.food.findMany({
        include: {
            Rating: true
        }
    });
    const foodFormat = allFood.map(e => {
        let sum = 0;
        const loop = e.Rating.map(e => {
            sum += e.score;
        });
        const avg = (sum / e.Rating.length).toFixed(1);
        return {
            foodId: e.food_id,
            foodName: e.food_name,
            foodPrice: e.food_price,
            rate_score: avg,
        };
    });
    res.status(200).json(foodFormat);
}));
// app/cartList
router.get('/cartList/:userid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.params;
    const cartList = yield prisma.cart.findUnique({
        where: {
            acc_id: Number(userid)
        },
        include: {
            CartDetail: {
                include: {
                    Food: true
                }
            }
        }
    });
    const format = cartList === null || cartList === void 0 ? void 0 : cartList.CartDetail.map(e => {
        return {
            foodId: e.Food.food_id,
            foodName: e.Food.food_name,
            foodImg: e.Food.food_img,
            foodPrice: e.Food.food_price,
            quantity: e.quantity
        };
    });
    res.status(200).json({
        cartList: format,
    });
}));
exports.default = router;
