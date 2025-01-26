import express from 'express';
import path from 'path';

const router = express();

router.get('/:filename', (req, res) => {
    
    const { filename } = req.params;

    const filePath = path.join(__dirname, '../../../upload/slip', filename)
    
    res.sendFile(filePath);

});

export default router;