import express from "express";
import ProductController from "../controllers/product.controller.js";
import ReviewController from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminProtect } from "../middleware/admin.middleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

const { getAllProducts, getTopProducts, getProductById } = ProductController;
const { createProductReview, deleteProductReview } = ReviewController;

router.get("/", asyncHandler(getAllProducts));
router.get("/top", asyncHandler(getTopProducts));
router.get("/:id", asyncHandler(getProductById));
router.route("/:id/reviews").post(protect, asyncHandler(createProductReview));
router
  .route("/:id1/reviews/:id2")
  .delete(protect, asyncHandler(deleteProductReview));

export default router;
