import express from "express";
import { getAssistantConfig } from "../controller/assistant.controller.js";

const router = express.Router();

router.get("/assistant-config/:userId", getAssistantConfig);

export default router;
