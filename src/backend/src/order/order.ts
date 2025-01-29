import express from "express"
import { verifyToken } from "../../function/token";
import { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { cartList } from "../interface";
import checkSlip from "../../function/checkSlip";
import socket from "../../lib/socket";
import orderData from "./orderData"
import tableOrder from './tableOrder'
import pay from "./pay"

const router = express();

const prisma = new PrismaClient();

interface SlipData {
  price: number,
  slip_img: string,
  method: string
}

interface input {
  tableId: string,
  foodList: cartList[],
  reservationData: SlipData,
  time: string
}

router.use('/', orderData)
router.use('/table', tableOrder)
router.use('/pay', pay)

// reservation adding
router.post('/reservation', async (req, res) => {

  try {
    const { tableId, foodList, reservationData, time } = req.body as input;
    const token = req.cookies['token'];

    const currentTime = new Date()
    const serviceTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 
    Number(time.split(":")[0]), Number(time.split(":")[1]), 0)

    console.log(serviceTime);

    const { userId } = verifyToken(token) as JwtPayload;

    if (reservationData.slip_img) {

      const slipOkRes = await checkSlip(reservationData.slip_img, 20)
      if (slipOkRes.status == 400) {
        throw new Error(slipOkRes.msg);
      }

      if (tableId || foodList) {
        const createdData = await prisma.order.create({
            data: {
                acc_id: Number(userId),
                order_status: "ordering",
                service_time: serviceTime,
                payment: {
                    create: {
                        status: "paid",
                        pay_count: reservationData.price,
                        slip_image: slipOkRes.imagePath as string,
                        pay_time: new Date(),
                        method: "promptpay"
                    }
                },
                OrderDetail: {
                    createMany: {
                        data: foodList.map(e => ({food_id: e.foodId, quantity: e.quantity}))
                    }
                },
                table_id: tableId,
            }
        })

        if (createdData) {
            socket.emit("order update")
            res.json({
              slipData: slipOkRes.slipOkData,
              order: createdData
            });
        } else {
            res.status(403).json({
                msg: 'Create Reservation fail'
            })
        }

      } else {
        throw new Error("Missing Data");
      }

    } else {
      throw new Error("Can't Find Slip Image")
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      res.status(403).json({
        msg: err.message
      })
    } else {
      res.status(400).json({
        msg: "Unexpect Error"
      })
    }
  }

})

router.post('/walkin', async(req, res) => {
  const token = req.cookies['token'];
  const { tableId } = req.body;

  try {

    if (!tableId) {
      throw new Error("Missing Data");
    }

    const payload = verifyToken(token) as JwtPayload;
    if (payload == undefined) {
      throw new Error("Missing token")
    }
    if (payload.Role === "cashier") {
      const newOrder = await prisma.order.create({
        data: {
          order_status: "pending",
          table: {
            connect: {
              table_id: tableId
            }
          }
        }
      })

      socket.emit("table update")

      res.status(201).json({
        msg: "Order Created!",
        createdData: newOrder
      })

    } else {
      throw new Error("Don't have permission")
    }
  } catch (error) {
    const err = error as Error
    res.status(400).json({
      msg: err.message
    })
  } 

})


router.post('/checkin', async(req, res) => {
  const token = req.cookies['token'];
  const { tableId } = req.body;

  try {

    const payload = verifyToken(token) as JwtPayload;

    if (payload == undefined) {
      throw new Error("Missing token")
    }

    if (!tableId) {
      throw new Error("Missing Data");
    }

    if (payload.Role === "cashier") {
      const updatedOrder = await prisma.order.updateMany({
        where: {
          table_id: tableId
        },
        data: {
          order_status: 'pending'
        }
      })

      socket.emit("table update")
      socket.emit("order update")

      res.status(200).json({
        msg: "Order Updated",
        createdData: updatedOrder
      })

    } else {
      throw new Error("Don't have permission")
    }
  } catch (error) {
    const err = error as Error
    res.status(400).json({
      msg: err.message
    })
  } 
})

export default router