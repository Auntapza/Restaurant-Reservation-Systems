"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = role;
const token_1 = require("./token");
function role(req, role) {
    const token = req.cookies['token'];
    const payload = (0, token_1.verifyToken)(token);
    if (payload == undefined) {
        throw new Error("Can't find token");
    }
    else {
        if (role === payload.Role) {
            return true;
        }
        else {
            return false;
        }
    }
}
