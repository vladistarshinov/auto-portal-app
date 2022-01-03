import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminProtect } from '../middleware/admin.middleware.js';

const router = express.Router();

const { getUsers, 
        getUserById, 
        updateUser, 
        deleteUser, 
        createProduct,
        updateProduct, 
        deleteProduct,
        getOrders } = adminController;

router.route("/users")
    .get(protect, adminProtect, getUsers);
router.route("/users/:id")
    .get(protect, adminProtect, getUserById)
    .put(protect, adminProtect, updateUser)
    .delete(protect, adminProtect, deleteUser);
router.route("/products")
    .post(protect, adminProtect, createProduct);
router.route("/products/:id")
    .put(protect, adminProtect, updateProduct)
    .delete(protect, adminProtect, deleteProduct);
router.route("/orders")
    .get(protect, adminProtect, getOrders);

export default router;