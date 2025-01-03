import jwt from 'jsonwebtoken'

const key = '!@12345'

export function createToken(payload:object) {

    return jwt.sign(payload, key, {
        expiresIn: '1h',
        algorithm: 'HS256'
    })

}

export function verifyToken(token:string) {

    try {
        const payload = jwt.verify(token, key);

        return payload;
    } catch {
        return undefined;
    }

}