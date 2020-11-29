import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOders,
  getOders,
  updateOrderToDelivererd,
} from "../controller/orderController.js";
import { protectedRoute, admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/myorders").get(protectedRoute, getMyOders);
router
  .route("/")
  .post(protectedRoute, addOrderItems)
  .get(protectedRoute, admin, getOders);
router.route("/:id").get(protectedRoute, getOrderById);
router.route("/:id/pay").put(protectedRoute, updateOrderToPaid);
router.route("/:id/deliver").put(protectedRoute,admin, updateOrderToDelivererd);

export default router;
