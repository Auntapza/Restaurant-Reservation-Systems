"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.default)();
router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path_1.default.join(__dirname, '../../../upload/food', filename);
    res.sendFile(filePath);
});
exports.default = router;
