"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.default)();
router.use(express_1.default.json({ limit: '100mb' }));
router.get('/', (req, res) => {
    res.json({
        "msg": "Test form socket file"
    });
});
router.post('/testFile', (req, res) => {
    const { img } = req.body;
    if (img) {
        const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
        const name = Date.now();
        const filePath = `./upload/test/${name}.png`;
        fs_1.default.writeFileSync(filePath, base64Data, { encoding: 'base64' });
        const foodImgPath = `http://localhost:4000/image/${name}.png`;
        res.json({
            img: foodImgPath
        });
    }
});
exports.default = router;
