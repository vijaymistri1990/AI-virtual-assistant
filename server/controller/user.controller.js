import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const findCurrentUser = asyncHandler(async(req,res)=>{
    const currentUser = await User.findById(req.user._id)
    if(!currentUser){
        throw new ApiError(404,"User not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,currentUser,"User fetched successfully"))
})