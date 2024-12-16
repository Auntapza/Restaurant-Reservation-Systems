import express from 'express';

import food from './food';
import account from './account';
import dashbordData from './dashbordData';
import cat from './category';

const router = express()

router.use('/food', food);
router.use('/account', account);
router.use('/', dashbordData);
router.use('/category', cat);

export default router;