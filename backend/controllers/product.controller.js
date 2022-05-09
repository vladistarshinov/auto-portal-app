import ProductService from "../services/product.service.js";

class ProductController {
  // @desc     Get all products
  // @route    GET /api/products
  // @access   Public
  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAll(req.query);
      res.json(products);
    } catch (e) {
      res.status(500);
      throw new Error(e.message);
    }
  }

  // @desc     Get products with top rating
  // @route    GET /api/products/top
  // @access   Public
  async getTopProducts(req, res) {
    const products = await ProductService.getTop();
    res.json(products);
  }

  // @desc     Get product by Id
  // @route    GET /api/products/:id
  // @access   Public
  async getProductById(req, res) {
    try {
      const product = await ProductService.getById(req.params.id);
      res.json(product);
    } catch (e) {
      res.status(500);
      throw new Error(e.message);
    }
  }
}

export default new ProductController();
