import express from "express";
import {
  userLogin,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controller/userControllers.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", userLogin);
router
  .route("/profile")
  .get(protectedRoute, getUserProfile)
  .put(protectedRoute, updateUserProfile);
router.route("/register").post(registerUser);

export default router;
