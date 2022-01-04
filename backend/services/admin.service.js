import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

class AdminService {
  async getUsers() {
    const users = await User.find({});
    return users;
  }

  async getUserById(id) {
    const user = await User.findById(id).select("-password");
    if (user) {
      return user;
    } else {
      //res.status(404);
      throw new Error("Пользователь не найден");
    }
  }

  async updateUser(id, data) {
    const user = await User.findById(id);

    if (user) {
      user.name = data.name || user.name;
      user.email = data.email || user.email;
      user.isAdmin = data.isAdmin || user.isAdmin;

      const updatedUser = await user.save();

      return {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      };
    } else {
      throw new Error("Пользователь не найден");
    }
  }

  async deleteUser(id) {
    const user = await User.findById(id);
    if (user) {
      await user.remove();
      return;
    } else {
      throw new Error("Пользователь не найден");
    }
  }

  async createProduct(userId, data) {
    const { name, description, image, price, countInStock, brand, category } =
      data;

    const existProduct = await Product.findOne({ name });

    if (existProduct) {
      //res.status(400);
      throw new Error("Товар с таким названием уже существует");
    }

    const product = new Product({
      user: userId,
      name,
      description,
      image,
      price,
      countInStock,
      brand,
      category,
      numReviews: 0,
    });

    const createdProduct = await product.save();
    return createdProduct;
  }

  async updateProduct(productId, data) {
    const { name, description, image, price, countInStock, brand, category } =
      data;

    const product = await Product.findById(productId);

    if (product) {
      product.name = name;
      product.description = description;
      product.image = image;
      product.price = price;
      product.countInStock = countInStock;
      product.brand = brand;
      product.category = category;

      const updatedProduct = await product.save();
      return updatedProduct;
    } else {
      //res.status(404);
      throw new Error("Товар не найден");
    }
  }

  async deleteProduct(id) {
    const product = await Product.findById(id);
    if (product) {
      await product.remove();
      return;
    } else {
      throw new Error("Товар не найден");
    }
  }

  async getOrders() {
    const orders = await Order.find({}).populate("user", "id name");
    return orders;
  }
}

export default new AdminService();
