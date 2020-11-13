import asyncHandler from 'express-async-handler';
import Product from '../models/product.model';

const productController = {};

// @desc     Get all products
// @route    GET /api/products
// @access   Public
productController.getAllProducts = asyncHandler(async (req, res) => {
    try {
      const pageSize = 8;
      const page = Number(req.query.pageNumber) || 1;
      const keyword = req.query.keyword ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      } : {};

      const count = await Product.countDocuments({ ...keyword });
      const products = await Product
          .find({ ...keyword })
          .limit(pageSize)
          .skip(pageSize * (page - 1));
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      res.status(500);
      throw new Error('Ошибка при загрузке товаров');
    }
});

// @desc     Get products with top rating
// @route    GET /api/products/top
// @access   Public
productController.getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// @desc     Get product by Id
// @route    GET /api/products/:id
// @access   Public
productController.getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    try {
      if (product) {
        res.json(product);
      } else {
        //res.status(404).json({msg: "Товар не найден"})
        res.status(404);
        throw new Error('Товар не найден');
      }
    } catch (error) {
      res.status(500);
      throw new Error(`Товар с идентификатором ${productId} не найден`);
    }
});

export default productController;