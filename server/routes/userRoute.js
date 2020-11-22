import express from "express";
import { userLogin, getUserProfile } from "../controller/userControllers.js";
import {protectedRoute} from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post("/login", userLogin);
router.route("/profile").get(protectedRoute, getUserProfile);

export default router;
