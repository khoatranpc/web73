import jwt from 'jsonwebtoken';

const createAccessToken = (document) => {
    const payload = {
        id: document._id,
        typeToken: 'ACCESSTOKEN'
    }
    const newToken = jwt.sign(payload, "WEB73ABCXSYZ", {
        expiresIn: 1000 * 60 * 3
    });
    return newToken;
}
const verifyToken = (token) => {
    const checkToken = jwt.verify(token, "WEB73ABCXSYZ");
    return checkToken;
}
export {
    createAccessToken,
    verifyToken
}