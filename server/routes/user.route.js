import express from "express"
import { findCurrentUser,saveAssistant } from "../controller/user.controller.js"
import { isAuth } from "../middleware/isAuth.middleware.js";

const router = express.Router();

router.get("/current-user", isAuth, findCurrentUser);
router.post("/save-assistant", isAuth, saveAssistant);

export default router;