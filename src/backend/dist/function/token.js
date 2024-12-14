"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = '!@1234';
function createToken(payload) {
    return jsonwebtoken_1.default.sign(payload, key, {
        algorithm: 'ES256',
        expiresIn: '1h'
    });
}
function verifyToken(token) {
    const payload = jsonwebtoken_1.default.verify(token, key);
    return payload ? true : false;
}
