import { verifyToken } from "../utils/index.js";

const middlewares = {
    checkToken: (req, res, next) => {
        const token = String(req.headers['authorization']).split(" ")[1];
        const checkToken = verifyToken(token);
        req.user = checkToken;
        next();
    }
}
export default middlewares;