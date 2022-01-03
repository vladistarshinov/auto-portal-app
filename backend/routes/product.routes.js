import express from 'express';
import productController from '../controllers/product.controller.js';
import reviewController from '../controllers/review.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminProtect } from '../middleware/admin.middleware.js';

const router = express.Router();

const { createProductReview, deleteProductReview } = reviewController;

router.get("/", productController.getAllProducts);
router.get("/top", productController.getTopProducts);
router.get("/:id", productController.getProductById);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id1/reviews/:id2").delete(protect, deleteProductReview);

export default router;