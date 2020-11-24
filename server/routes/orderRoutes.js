import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOders,
} from "../controller/orderController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/myorders").get(protectedRoute, getMyOders);
router.route("/").post(protectedRoute, addOrderItems);
router.route("/:id").get(protectedRoute, getOrderById);
router.route("/:id/pay").put(protectedRoute, updateOrderToPaid);


export default router;
