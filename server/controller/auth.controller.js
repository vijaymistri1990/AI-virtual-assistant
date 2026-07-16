import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";


export const googleAuth = asyncHandler(async (req, res) => {
    const {name,email}= req.body

    if(!name || email){
        throw new ApiError(400, "name and email are required")
    }

    let user = await User.findOne({email})

    if(user){
        throw new ApiError(400,"user already exists")
    }

    const newUser = await User.create({name,email})

    const token = newUser.generateAccessToken(newUser._id)

    const options = {
        httpOnly: true,
        secure:false,
        sameSite:"strict",
        maxAge:1000*60*60*24*7  // 7 days
    }
    return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, {newUser,token},"User Registered successfully"))
})

export const logout = asyncHandler(async(req,res)=>{
    const options = {
        httpOnly: true,
        secure:false,
        sameSite:"strict",
        maxAge:1000*60*60*24*7  // 7 days
    }
    await res.clearCookie("token",options)
    return res
    .status(200)
    .json(new ApiResponse(200, {},"User Logged out successfully"))
})