import express from 'express'
import page from "./page"
import order from "./order"

const router = express();

router.use('/page', page)
router.use('/order', order)
export default router