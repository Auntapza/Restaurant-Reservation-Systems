import express from "express";
import fs from 'fs'

const router = express();

router.use(express.json({limit: '100mb'}))

router.get('/', (req, res) => {
    res.json({
        "msg": "Test form socket file"
    })
})


router.post('/testFile', (req, res) => {
    const {img} = req.body;

    if (img) {
        const base64Data = img.replace(/^data:image\/\w+;base64,/, '');

        const name = Date.now();
        
        const filePath = `./upload/test/${name}.png`
        fs.writeFileSync(filePath, base64Data, {encoding: 'base64'});
        const foodImgPath = `http://localhost:4000/image/${name}.png`;
        res.json({
            img: foodImgPath
        });
    }
})
export default router;