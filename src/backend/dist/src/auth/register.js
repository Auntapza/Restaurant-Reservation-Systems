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
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fname, lname, username, password } = req.body;
    const hashPassword = crypto_1.default.createHash('sha256').update(password).digest('hex');
    if (fname && lname && username && password) {
        const allUsername = yield prisma.username.count({
            where: {
                username
            }
        });
        if (allUsername <= 0) {
            const createdData = yield prisma.account.create({
                data: {
                    acc_fname: fname,
                    acc_lname: lname,
                    role: 'customer',
                    Username: {
                        create: {
                            username,
                            password: hashPassword
                        }
                    }
                }
            });
            if (createdData) {
                res.status(201).json({
                    msg: 'Create data successfuly'
                });
            }
            else {
                res.status(403).json({
                    msg: 'fail to create data'
                });
            }
        }
        else {
            res.status(403).json({
                msg: 'Username has already takend'
            });
        }
    }
    else {
        res.status(403).json({
            msg: 'missing data'
        });
    }
}));
exports.default = router;
