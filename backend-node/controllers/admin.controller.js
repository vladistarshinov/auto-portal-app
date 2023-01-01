import asyncHandler from "express-async-handler";
import AdminService from "../services/admin.service.js";

class AdminController {
  // @desc     Get all users
  // @route    GET /api/admin/users
  // @access   Private/Admin
  async getUsers(req, res) {
    const users = await AdminService.getUsers();
    res.json(users);
  }

  // @desc     Get users by id
  // @route    GET /api/admin/users/:id
  // @access   Private/Admin
  async getUserById(req, res) {
    const user = await AdminService.getUserById(req.params.id);
    res.json(user);
  }

  // @desc     Update user
  // @route    PUT /api/admin/users/:id
  // @access   Private/Admin
  async updateUser(req, res) {
    try {
      const updatedUser = await AdminService.updateUser(
        req.params.id,
        req.body
      );
      res.json(updatedUser);
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }
  }

  // @desc     Delete user
  // @route    DELETE /api/admin/users/:id
  // @access   Private/Admin
  async deleteUser(req, res) {
    try {
      await AdminService.deleteUser(req.params.id);
      res.json({ message: "Пользователь успешно удален" });
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }
  }

  // @desc     Create a product
  // @route    POST /api/admin/products
  // @access   Private/Admin
  async reateProduct(req, res) {
    try {
      const newProduct = await AdminService.createProduct(
        req.user._id,
        req.body
      );
      res.status(201).json(newProduct);
    } catch (e) {
      res.status(500);
      throw new Error(e.message);
    }
  }

  // @desc     Update product
  // @route    PUT /api/admin/products/:id
  // @access   Private/Admin
  async updateProduct(req, res) {
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
  }

  // @desc     Delete product
  // @route    DELETE /api/admin/products/:id
  // @access   Private/Admin
  async deleteProduct(req, res) {
    try {
      await AdminService.deleteProduct(req.params.id);
      res.json({ message: "Товар успешно удален" });
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }
  }

  // @desc     Get all orders
  // @route    GET /api/admin/orders
  // @access   Private/Admin
  async getOrders(req, res) {
    try {
      const orders = await AdminService.getOrders();
      res.json(orders);
    } catch (e) {
      res.status(500);
      throw new Error(e.message);
    }
  }
}

export default new AdminController();
