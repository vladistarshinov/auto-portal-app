import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

class AdminService {
	async getUsers() {
		const users = await User.find({});
    return users;
	}

	async getUserById(id) {
		const user = await User.findById(id).select('-password');
    if (user) {
        return user;
    } else {
        //res.status(404);
        throw new Error("Пользователь не найден")
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

	async createProduct(id, data) {
		
	}

	async updateProduct(id, data) {
		
	}

	async deleteProduct(id, data) {
		
	}

	async getOrders(id, data) {
		
	}
}

export default new AdminService();