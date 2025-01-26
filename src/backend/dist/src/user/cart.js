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
// get all cart detail function
function getAllCartList(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartList = yield prisma.cart.findUnique({
            where: {
                acc_id: userid
            },
            include: {
                CartDetail: {
                    include: {
                        Food: true
                    }
                }
            }
        });
        if (cartList) {
            return cartList === null || cartList === void 0 ? void 0 : cartList.CartDetail.map(e => {
                return {
                    foodId: e.Food.food_id,
                    foodName: e.Food.food_name,
                    foodImg: e.Food.food_img,
                    foodPrice: e.Food.food_price,
                    quantity: e.quantity
                };
            });
        }
        else {
            return [];
        }
    });
}
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    res.status(200).json(yield getAllCartList(Number(userId)));
}));
/// add food to cart
router.post('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodId, quantity } = req.body;
    const { userId } = req.params;
    const foodData = yield prisma.food.findUnique({
        where: {
            food_id: Number(foodId)
        }
    });
    if (!foodData) {
        res.status(403).json({
            msg: "Can't find this menu"
        });
    }
    else {
        // function add menu to cart list
        function addCartList(foodId, cartId) {
            return __awaiter(this, void 0, void 0, function* () {
                const allMenu = yield getAllCartList(Number(userId));
                // check if found duplicatie menu
                let loop = 0;
                const loopMenu = allMenu.map(e => {
                    if (e.foodId == foodId) {
                        loop += 1;
                        return e;
                    }
                    else {
                        return undefined;
                    }
                });
                if (loop > 0) {
                    const data = loopMenu.filter(e => e != undefined);
                    return yield prisma.cartDetail.update({
                        where: {
                            cart_id_food_id: {
                                cart_id: cartId,
                                food_id: foodId
                            }
                        },
                        data: {
                            quantity: Number(data[0].quantity) + quantity
                        }
                    });
                }
                else {
                    return yield prisma.cartDetail.create({
                        data: {
                            food_id: Number(foodId),
                            cart_id: Number(cartId),
                            quantity: Number(quantity)
                        },
                        select: {
                            Food: true,
                            quantity: true
                        }
                    });
                }
            });
        }
        // find old cart
        const cartId = yield prisma.cart.findUnique({
            where: {
                acc_id: Number(userId)
            },
            select: {
                cart_id: true
            }
        });
        let addedItem;
        // check if found old cart
        if (cartId) {
            addedItem = yield addCartList(Number(foodId), Number(cartId.cart_id));
        }
        else {
            const cartIdd = yield prisma.cart.create({
                data: {
                    acc_id: Number(userId)
                },
                select: {
                    cart_id: true
                }
            });
            addedItem = yield addCartList(Number(foodId), Number(cartIdd.cart_id));
        }
        if (addedItem) {
            res.json(yield getAllCartList(Number(userId)));
        }
        else {
            res.status(403).json({
                msg: 'Fail to add item to cart'
            });
        }
    }
}));
// update cart Quantity
router.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { foodId, quantity } = req.body;
    if (userId && foodId && quantity) {
        try {
            const cartData = yield prisma.cart.findUnique({
                where: {
                    acc_id: Number(userId)
                },
                select: {
                    cart_id: true
                }
            });
            const updatedData = yield prisma.cartDetail.update({
                where: {
                    cart_id_food_id: {
                        cart_id: cartData.cart_id,
                        food_id: Number(foodId)
                    }
                },
                data: {
                    quantity: Number(quantity)
                }
            });
            if (updatedData) {
                res.json(yield getAllCartList(Number(userId)));
            }
            else {
                res.status(400).json({
                    msg: "fail to update cart"
                });
            }
        }
        catch (_a) {
            res.status(403).json({
                msg: "Can't find menu in cart"
            });
        }
    }
    else {
        res.status(403).json({
            msg: "Missing Data"
        });
    }
}));
// delete menu from cart
router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodId } = req.body;
    const { userId } = req.params;
    if (!foodId && !userId) {
        res.status(400).json({
            msg: "Missing Data"
        });
    }
    try {
        const CartData = yield prisma.cart.findUnique({
            where: {
                acc_id: Number(userId)
            }
        });
        const deletedData = yield prisma.cartDetail.delete({
            where: {
                cart_id_food_id: {
                    food_id: Number(foodId),
                    cart_id: CartData === null || CartData === void 0 ? void 0 : CartData.cart_id
                }
            }
        });
        if (deletedData) {
            res.json(yield getAllCartList(Number(userId)));
        }
        else {
            res.status(400).json({
                msg: "Can't find this menu"
            });
        }
    }
    catch (_a) {
        res.status(403).json({
            msg: "Fail to Delete menu in cart"
        });
    }
}));
// clear cart 
router.delete('/clear/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        yield prisma.cartDetail.deleteMany({
            where: {
                cart: {
                    acc_id: Number(userId)
                }
            }
        });
        res.json({
            msg: "delete cart item successfuly"
        });
    }
    catch (_a) {
        res.status(400).json({
            msg: "Fail to delete cart item"
        });
    }
}));
exports.default = router;
