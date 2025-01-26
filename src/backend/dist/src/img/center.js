"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const food_1 = __importDefault(require("./food"));
const slip_1 = __importDefault(require("./slip"));
const router = (0, express_1.default)();
router.use('/food', food_1.default);
router.use('/slip', slip_1.default);
exports.default = router;
