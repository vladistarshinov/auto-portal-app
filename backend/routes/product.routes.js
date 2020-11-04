import express from 'express';
import productController from '../controllers/product.controller';
import reviewController from '../controllers/review.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

const { createProductReview } = reviewController;

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;