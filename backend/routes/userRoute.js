import express from "express";
import {
  userLogin,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controller/userControllers.js";
import { protectedRoute, admin } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.route("/").get(protectedRoute, admin, getUsers);
router.post("/login", userLogin);
router
  .route("/profile")
  .get(protectedRoute, getUserProfile)
  .put(protectedRoute, updateUserProfile);
router.route("/register").post(registerUser);
router
  .route("/:id")
  .delete(protectedRoute, admin, deleteUser)
  .get(protectedRoute, admin, getUserById)
  .put(protectedRoute, admin, updateUser);

export default router;
