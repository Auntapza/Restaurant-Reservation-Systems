import jwt from 'jsonwebtoken'
import { tokenPayload } from '../src/interface'

const key = '!@1234'

export function createToken(payload:tokenPayload) {

    return jwt.sign(payload, key, {
        algorithm: 'ES256',
        expiresIn: '1h'
    })

}

export function verifyToken(token:string) {

    const payload = jwt.verify(token, key);

    return payload ? true : false

}