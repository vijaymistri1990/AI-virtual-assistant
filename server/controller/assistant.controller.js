import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const getAssistantConfig = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).select("-geminiApiKey");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res
    .status(200)
    .json({
      message: "Assistant config data fetched successfully",
      success: true,
      user,
    });
});
