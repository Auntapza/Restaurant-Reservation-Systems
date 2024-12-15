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
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// get all food Data
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.food.findMany();
    const category = yield prisma.category.findMany();
    res.json({
        foodList: data.map(e => ({
            foodId: e.food_id,
            foodImg: e.food_img,
            foodPrice: e.food_price,
            foodName: e.food_name
        })),
        category: category.map(e => ({
            catId: e.cat_id,
            catName: e.cat_name
        }))
    });
}));
// get food data by id
router.get('/:foodId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodId } = req.params;
    const data = yield prisma.food.findUnique({
        where: {
            food_id: Number(foodId)
        }
    });
    if (data) {
        res.json({
            foodId: data === null || data === void 0 ? void 0 : data.food_id,
            foodImg: data === null || data === void 0 ? void 0 : data.food_img,
            foodPrice: data === null || data === void 0 ? void 0 : data.food_price,
            foodName: data === null || data === void 0 ? void 0 : data.food_name
        });
    }
    else {
        res.status(403).json({
            msg: `Can't find food by this id (${foodId})`
        });
    }
}));
//insert new food Data
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodName, foodPrice, catId, foodImg } = req.body;
    let createdData;
    if (foodImg) {
        const base64Data = foodImg.replace(/^data:image\/\w+;base64,/, '');
        const name = Date.now();
        const filePath = `./upload/food/${name}.png`;
        fs_1.default.writeFileSync(filePath, base64Data, { encoding: 'base64' });
        const foodImgPath = `http://localhost:4000/image/food/${name}.png`;
        createdData = yield prisma.food.create({
            data: {
                food_name: foodName,
                food_price: foodPrice,
                cat_id: catId,
                food_img: foodImgPath
            }
        });
    }
    else {
        createdData = yield prisma.food.create({
            data: {
                food_name: foodName,
                food_price: foodPrice,
                cat_id: catId
            }
        });
    }
    res.status(201).json({
        msg: "Create Data successfuly",
        data: createdData
    });
}));
// update food data
router.put('/:foodId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodName, foodPrice, catId, foodImg } = req.body;
    const { foodId } = req.params;
    let createdData;
    if (foodImg) {
        const base64Data = foodImg.replace(/^data:image\/\w+;base64,/, '');
        const name = Date.now();
        const filePath = `./upload/food/${name}.png`;
        fs_1.default.writeFileSync(filePath, base64Data, { encoding: 'base64' });
        const foodImgPath = `http://localhost:4000/image/food/${name}.png`;
        createdData = yield prisma.food.update({
            data: {
                food_name: foodName,
                food_price: foodPrice,
                cat_id: catId,
                food_img: foodImgPath
            },
            where: {
                food_id: Number(foodId)
            }
        });
    }
    else {
        createdData = yield prisma.food.update({
            data: {
                food_name: foodName,
                food_price: foodPrice,
                cat_id: catId
            },
            where: {
                food_id: Number(foodId)
            }
        });
    }
    res.status(201).json({
        msg: "Create Data successfuly",
        data: createdData
    });
}));
// delete food
router.delete('/:foodId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodId } = req.params;
    const deletedData = yield prisma.food.delete({
        where: {
            food_id: Number(foodId)
        }
    });
    res.status(203).json({
        msg: "Delete data successfuly",
        dataDelete: deletedData
    });
}));
exports.default = router;
