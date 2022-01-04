import asyncHandler from 'express-async-handler';
import AdminService from '../services/admin.service.js';

const adminController = {};

// @desc     Get all users
// @route    GET /api/admin/users
// @access   Private/Admin
adminController.getUsers = asyncHandler(async (req, res) => {
    const users = await AdminService.getUsers();
    res.json(users);
});

// @desc     Get users by id
// @route    GET /api/admin/users/:id
// @access   Private/Admin
adminController.getUserById = asyncHandler(async (req, res) => {
    const user = await AdminService.getUserById(req.params.id);
    res.json(user);
});

// @desc     Update user
// @route    PUT /api/admin/users/:id
// @access   Private/Admin
adminController.updateUser = asyncHandler(async (req, res) => {
    try {
        const updatedUser = await AdminService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (e) {
        res.status(404);
        throw new Error(e.message);
    }
});

// @desc     Delete user
// @route    DELETE /api/admin/users/:id
// @access   Private/Admin
adminController.deleteUser = asyncHandler(async (req, res) => {
    try {
      await AdminService.deleteUser(req.params.id);
      res.json({ message: "Пользователь успешно удален" });
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }
});

// @desc     Create a product
// @route    POST /api/admin/products
// @access   Private/Admin
adminController.createProduct = asyncHandler(async (req, res) => {
    try {
      const newProduct = await AdminService.createProduct(req.user._id, req.body);
      res.status(201).json(newProduct);
    } catch (e) {
      res.status(500);
      throw new Error(e.message);
    } 
});

// @desc     Update product
// @route    PUT /api/admin/products/:id
// @access   Private/Admin
adminController.updateProduct = asyncHandler(async (req, res) => {
     try {
       const updatedProduct = await AdminService.updateProduct(
         req.params.id,
         req.body
       );
       res.json(updatedProduct);
     } catch (e) {
       res.status(500);
       throw new Error(e.message);
     } 
});


// @desc     Delete product
// @route    DELETE /api/admin/products/:id
// @access   Private/Admin
adminController.deleteProduct = asyncHandler(async (req, res) => {
    try {
      await AdminService.deleteProduct(
        req.params.id
      );
      res.json({ message: "Товар успешно удален" });
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    } 
});

// @desc     Get all orders
// @route    GET /api/admin/orders
// @access   Private/Admin
adminController.getOrders = asyncHandler(async (req, res) => {
    try {
      const orders = await AdminService.getOrders();
      res.json(orders);
    } catch (e) {
      res.status(500);
      throw new Error(e.message);
    } 
});


export default adminController;