import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

const productController = {};

// @desc     Get all products
// @route    GET /api/products
// @access   Public
productController.getAllProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500);
      throw new Error('Ошибка при загрузке товаров');
    }
});

// @desc     Get product by Id
// @route    GET /api/products/:id
// @access   Public
productController.getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      //res.status(404).json({msg: "Товар не найден"})
      res.status(404);
      throw new Error('Товар не найден');
    }
});

export default productController;