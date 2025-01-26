import { account_role } from "@prisma/client";
import { verifyToken } from "./token";
import { JwtPayload } from "jsonwebtoken";

export default function role(req:any, role:account_role) {
    const token = req.cookies['token'];
    const payload = verifyToken(token) as JwtPayload;

    if (payload == undefined) {
        throw new Error("Can't find token");
    } else {
        if (role === payload.Role) {
            return true;
        } else {
            return false;
        }
    }

}