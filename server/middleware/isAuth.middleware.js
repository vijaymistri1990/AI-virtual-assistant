import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken";


export const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized - No Token" });
        }

        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ success: false, message: "Not Authorized - Invalid Token" });
        }
        req.user = verifyToken;
        next();
    } catch (error) {
        console.log("Auth Middleware Error:", error.message);
        return res.status(401).json({ success: false, message: "Not Authorized" });
    }
};