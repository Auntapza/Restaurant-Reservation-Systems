"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const token_1 = require("../../function/token");
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient;
router.use('/login', login_1.default);
router.use('/register', register_1.default);
router.use((0, cookie_parser_1.default)());
router.get('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token'];
    if (token) {
        const tokenPayload = (0, token_1.verifyToken)(token);
        if (tokenPayload.Role === 'customer') {
            res.status(200).json(tokenPayload);
        }
        else {
            res.status(401).json({ token });
        }
    }
    else {
        res.status(401).json({ token });
    }
}));
exports.default = router;
