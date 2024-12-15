import express from 'express';

import food from './food'

const router = express();

router.use('/food', food);

export default router;