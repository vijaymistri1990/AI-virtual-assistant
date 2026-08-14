import express from "express";
import { getAssistantConfig, askAssistant } from "../controller/assistant.controller.js";

const router = express.Router();

router.get("/assistant-config/:userId", getAssistantConfig);
router.post("/ask-assistant", askAssistant);

export default router;
