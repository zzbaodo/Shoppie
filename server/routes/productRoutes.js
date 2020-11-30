import express from "express"
import {
  getProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from "../controller/productControllers.js"
import { protectedRoute, admin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route("/").get(getProducts).post(protectedRoute, admin, createProduct)
router.route("/:id/reviews").post(protectedRoute, createProductReview)
router.get("/top", getTopProducts)
router
  .route("/:id")
  .get(getProductByID)
  .delete(protectedRoute, admin, deleteProduct)
  .put(protectedRoute, admin, updateProduct)

export default router
