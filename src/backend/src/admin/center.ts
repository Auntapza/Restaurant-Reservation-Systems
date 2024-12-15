import express from 'express';

import food from './food';
import account from './account';
import dashbordData from './dashbordData';

const router = express()

router.use('/food', food);
router.use('/account', account);
router.use('/', dashbordData);

export default router;