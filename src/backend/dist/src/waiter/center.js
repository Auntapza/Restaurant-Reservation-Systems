"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_1 = __importDefault(require("./page"));
const router = (0, express_1.default)();
router.use('/page', page_1.default);
exports.default = router;
