"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = '!@12345';
function createToken(payload) {
    return jsonwebtoken_1.default.sign(payload, key, {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
}
function verifyToken(token) {
    try {
        const payload = jsonwebtoken_1.default.verify(token, key);
        return payload;
    }
    catch (_a) {
        return undefined;
    }
}
