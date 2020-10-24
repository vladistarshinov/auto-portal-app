import express from 'express';
import productController from '../controllers/product.controller';

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

export default router;