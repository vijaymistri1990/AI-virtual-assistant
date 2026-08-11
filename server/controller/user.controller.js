import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const findCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  if (!currentUser) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, currentUser, "User fetched successfully"));
});

export const saveAssistant = asyncHandler(async (req, res) => {
  const {
    assistantName,
    businessName,
    businessType,
    businessDescription,
    theme,
    tone,
    geminiApiKey,
    pages,
  } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.assistantName = assistantName;
  user.businessName = businessName;
  user.businessType = businessType;
  user.businessDescription = businessDescription;
  user.theme = theme;
  user.tone = tone;

  if (geminiApiKey) {
    user.geminiApiKey = geminiApiKey;
  }
  user.geminiStatus = "active";
  user.pages = pages || [];
  user.isSetupComplate = true;
  
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Assistant saved successfully"));
});
