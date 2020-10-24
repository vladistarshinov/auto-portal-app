import express from 'express'
import asyncHandler from 'express-async-handler';
import productController from '../controllers/product.controller';

const router = express.Router();

router.get("/", asyncHandler(productController.getAllProducts));
router.get("/:id", asyncHandler(productController.getProductById));

export default router;