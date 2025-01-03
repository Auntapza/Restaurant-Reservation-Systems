import { PrismaClient } from '@prisma/client';
import express from 'express';
import { cartList } from '../interface';

const router = express();
const prisma = new PrismaClient;

// get all cart detail function
async function getAllCartList(userid:number) {
    const cartList = await prisma.cart.findUnique({
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
    })

    if (cartList) {
        return cartList?.CartDetail.map(e => {
            return {
                foodId: e.Food.food_id,
                foodName: e.Food.food_name,
                foodImg: e.Food.food_img,
                foodPrice: e.Food.food_price,
                quantity: e.quantity
            }
        });
    } else {
        return [];
    }
}

router.get('/:userId', async(req, res) => {
   
    const { userId } = req.params

    res.status(200).json(await getAllCartList(Number(userId)));

})

/// add food to cart
router.post('/:userId', async(req, res) => {
    
    const { foodId, quantity } = req.body;
    const { userId } = req.params;

    const foodData = await prisma.food.findUnique({
        where: {
            food_id: Number(foodId)
        }
    })

    if (!foodData) {
        res.status(403).json({
            msg: "Can't find this menu"
        })
    } else {

        // function add menu to cart list
        async function addCartList(foodId:number, cartId:number) {

            const allMenu = await getAllCartList(Number(userId)) as cartList[];
            
            // check if found duplicatie menu
            let loop = 0
            const loopMenu = allMenu.map(e => {
                if (e.foodId == foodId) {
                    loop += 1
                    return e
                } else {
                    return undefined
                }
            })

            if (loop > 0) {
                const data = loopMenu.filter(e => e != undefined)
                return await prisma.cartDetail.update({
                    where: {
                        cart_id_food_id: {
                            cart_id: cartId,
                            food_id: foodId
                        }
                    },
                    data: {
                        quantity: Number(data[0].quantity) + quantity
                    }
                })
            } else {
                return await prisma.cartDetail.create({
                    data: {
                        food_id: Number(foodId),
                        cart_id: Number(cartId),
                        quantity: Number(quantity)
                    },
                    select: {
                        Food: true,
                        quantity: true
                    }
                }) 
            }
            
        }
        
        // find old cart
        const cartId = await prisma.cart.findUnique({
            where: {
                acc_id: Number(userId)
            },
            select: {
                cart_id: true
            }
        })
        
        let addedItem
        
        // check if found old cart
        if (cartId) {
            addedItem = await addCartList(Number(foodId), Number(cartId.cart_id))
        } else {
            const cartIdd = await prisma.cart.create({
                data: {
                    acc_id: Number(userId)
                },
                select: {
                    cart_id: true
                }
            })

            addedItem = await addCartList(Number(foodId), Number(cartIdd.cart_id))
        }

        if (addedItem) {
            res.json(await getAllCartList(Number(userId)))
        } else {
            res.status(403).json({
                msg: 'Fail to add item to cart'
            })
        }
    }

})

// update cart Quantity
router.put('/:userId', async(req, res) => {
    
    const { userId } = req.params;
    const { foodId, quantity } = req.body;

    if (userId && foodId && quantity) {
        try {
            const cartData: {cart_id : number} = await prisma.cart.findUnique({
                where: {
                    acc_id: Number(userId)
                },
                select: {
                    cart_id: true
                }
            }) as {cart_id : number}
        
            const updatedData = await prisma.cartDetail.update({
                where: {
                    cart_id_food_id: {
                        cart_id: cartData.cart_id,
                        food_id: Number(foodId)
                    }
                },
                data: {
                    quantity: Number(quantity)
                }
            })

            if (updatedData) {
                res.json(await getAllCartList(Number(userId)));
            } else {
                res.status(400).json({
                    msg: "fail to update cart"
                })
            }
        } catch {
            res.status(403).json({
                msg: "Can't find menu in cart"
            })
        }
    } else {
        res.status(403).json({
            msg: "Missing Data"
        })
    }

})

// delete menu from cart
router.delete('/:userId', async(req, res) => {
    
    const { foodId } = req.body;
    const { userId } = req.params;

    if (!foodId && !userId) {
        res.status(400).json({
            msg: "Missing Data"
        })
    }
    
    try {

        const CartData = await prisma.cart.findUnique({
            where: {
                acc_id: Number(userId)
            }
        }) as {cart_id : number}

        const deletedData = await prisma.cartDetail.delete({
            where: {
                cart_id_food_id: {
                    food_id: Number(foodId),
                    cart_id: CartData?.cart_id
                }
            }
        })

        if (deletedData) {
            res.json(await getAllCartList(Number(userId)))
        } else {
            res.status(400).json({
                msg: "Can't find this menu"
            })
        }
        
    } catch {
        res.status(403).json({
            msg: "Fail to Delete menu in cart"
        })
    }

})

export default router;