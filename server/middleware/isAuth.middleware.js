import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken";


export const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(token){
            console.log(token)
        }else{
            throw new ApiError(400,"Not Authorized")
        }

        const verifyToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if(!verifyToken){
            throw new ApiError(400,"Not Authorized")
        }
        req.user = verifyToken
        next()
    } catch (error) {
        console.log(error)
    }
}