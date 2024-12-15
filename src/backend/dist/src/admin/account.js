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
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// get all worker Data
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.account.findMany();
    res.status(200).json(data);
}));
// get worker Data by id
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const data = yield prisma.account.findUnique({
        where: {
            acc_id: Number(userId)
        }
    });
    res.status(200).json(data);
}));
// insert new worker Data
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fname, lname, role } = req.body;
    const createdData = yield prisma.account.create({
        data: {
            acc_fname: fname,
            acc_lname: lname,
            role,
            Username: {
                create: {
                    username,
                    password
                }
            }
        },
        include: {
            Username: true
        }
    });
    res.status(201).json({
        msg: 'New worker added!',
        data: createdData
    });
}));
// update worker data
router.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fname, lname, role } = req.body;
    const { userId } = req.params;
    const updatedData = yield prisma.account.update({
        where: {
            acc_id: Number(userId)
        },
        data: {
            Username: {
                update: {
                    username,
                    password
                }
            },
            acc_fname: fname,
            acc_lname: lname,
            role
        }
    });
    res.status(202).json({
        msg: 'Update Worker Data successfuly',
        data: updatedData
    });
}));
// delete worker Data
router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const deletedData = yield prisma.account.delete({
        where: {
            acc_id: Number(userId)
        }
    });
    res.status(202).json({
        msg: "Delete Data successfuly",
        deletedData
    });
}));
exports.default = router;
