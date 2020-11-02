import express from 'express';
import adminController from '../controllers/admin.controller';
import { protect } from '../middleware/auth.middleware';
import { adminProtect } from '../middleware/admin.middleware';

const router = express.Router();

const { getUsers, 
        getUserById, 
        updateUser, 
        deleteUser, 
        createProduct, 
        deleteProduct } = adminController;

router.route("/users")
    .get(protect, adminProtect, getUsers);
router.route("/users/:id")
    .get(protect, adminProtect, getUserById)
    .put(protect, adminProtect, updateUser)
    .delete(protect, adminProtect, deleteUser);
router.route("/products")
    .post(protect, adminProtect, createProduct);
router.route("/products/:id")
    .delete(protect, adminProtect, deleteProduct);

export default router;