import express from 'express';

import food from './food'
import slip from './slip'

const router = express();

router.use('/food', food);
router.use('/slip', slip)

export default router;