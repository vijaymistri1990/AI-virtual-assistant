import express from "express"
import { findCurrentUser } from "../controller/user.controller.js"
import { isAuth } from "../middleware/isAuth.middleware.js";

const router = express.Router();

router.get('/current-user',isAuth,findCurrentUser)


export default router