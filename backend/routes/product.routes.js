import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel'

const router = express.Router()

// @desc     Get all products
// @route    GET /api/products
// @access   Public
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

// @desc     Get product by Id
// @route    GET /api/products/:id
// @access   Public
router.get("/:id", asyncHandler(async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
      res.json(product)
    } else {
      //res.status(404).json({msg: "Товар не найден"})
      res.status(404)
      throw new Error('Товар не найден')
    }
}))

export default router