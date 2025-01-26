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
const prisma = new client_1.PrismaClient;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tableStatus = yield prisma.table.findMany({
        include: {
            order: {
                orderBy: {
                    order_date: 'desc'
                }
            }
        }
    });
    const data = tableStatus.map((e) => {
        if (e.order.length > 0) {
            const order = e.order[0];
            let status = 0;
            if (order.order_status == "ordering") {
                status = 2;
            }
            else if (order.order_status == "pending") {
                status = 1;
            }
            else if (order.order_status == "complete") {
                status = 0;
            }
            return {
                tableId: e.table_id,
                status: status
            };
        }
        else {
            return {
                tableId: e.table_id,
                status: 0
            };
        }
    });
    res.json(data);
}));
exports.default = router;
