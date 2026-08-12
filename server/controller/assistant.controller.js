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


export const askAssistant = asyncHandler(async (req, res) =>{
  const {message, userId, currentPath} = req.body;

  if(!message || !userId){
    return res.status(400).json({success: false, message: "message and userId are required"})
  }

  const user = await User.findById(userId);

  if(!user){
    return res.status(404).json({success: false, message: "User not found"})
  }

  if(user.geminiApiKey){
    return res.status(400).json({success: false, message: "Please enter gemini api key"})
  }

  if(user.plan === 'free' && user.totalMessages >= user.requestLimit){
    return res.status(400).json({success: false, message: "You have reached your free message limit. Please upgrade to a paid plan."})
  }

  if(user.plan ==='pro' && new Date(user.proExpireAt)<new Date()){
    await user.save()
    return res.status(400).json({success:false, message: "Your pro subscription has expired. Please renew your subscription."})
  }

  const cleanMessage = message.toLowerCase().trim();

  if(user.enableNavigation){
    const navigationWords = [
        "open",
        "go",
        "start",
        "show",
        "navigate",
        "take me"
    ]

    const wantsNavigation = navigationWords.some(word=>cleanMessage.startsWith(word))

    if(wantsNavigation){
      const matchPages = user.pages.filter(page=>page.keywords.some(keyword=>cleanMessage.includes(keyword.toLowerCase())))

      if(matchPages.length > 0){
        user.totalMessages += 1
        await user.save()

        if (matchPages.length === 1) {
            const matchedPage = matchPages[0];
            if (currentPath && matchedPage.path === currentPath) {
                return res.json({
                    text: `You are already on the ${matchedPage.name} page.`,
                });
            }

            return res.json({
                success: true,
                action: "navigate",
                path: matchedPage.path,
                response: `Opening ${matchedPage.name}`
            });
        }

        const pageNames = matchPages.map(p => p.name);
        
        return res.json({
            text: `I can help with that! Here are the available pages: ${pageNames.join(", ")}. Which one would you like to visit?`,
            pageLinks: matchPages.map(p => ({
                name: p.name,
                url: p.path
            }))
        })
      }
    }
  }

  
})
