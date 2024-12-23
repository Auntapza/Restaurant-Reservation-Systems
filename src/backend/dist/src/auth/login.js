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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const token_1 = require("../../function/token");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(403).json({
            msg: "Missing username or password"
        });
    }
    const decryptPassword = crypto_1.default.createHash('sha256').update(password).digest('hex');
    const userData = yield prisma.username.findMany({
        where: {
            username,
            password: decryptPassword
        },
        include: {
            Account: true
        }
    });
    if (userData.length === 1) {
        const data = Object.assign({}, userData[0]);
        const payload = {
            userId: data.acc_id,
            Role: data.Account.role
        };
        const token = (0, token_1.createToken)(payload);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
            msg: 'Login successfully'
        });
    }
    else {
        res.status(402).json({
            msg: 'username or password incorect'
        });
    }
}));
exports.default = router;
