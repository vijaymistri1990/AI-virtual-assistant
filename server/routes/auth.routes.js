import express from "express"
import { googleAuth, logout } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/googleauth',googleAuth)
router.post('/logout',logout)


export default router