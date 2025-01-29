import express from 'express'
import page from "./page"

const router = express();

router.use('/page', page)

export default router