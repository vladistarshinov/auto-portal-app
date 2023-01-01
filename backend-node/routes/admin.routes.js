import express from "express";
import AdminController from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminProtect } from "../middleware/admin.middleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
} = AdminController;

router.route("/users").get(protect, adminProtect, asyncHandler(getUsers));
router
  .route("/users/:id")
  .get(protect, adminProtect, asyncHandler(getUserById))
  .put(protect, adminProtect, asyncHandler(updateUser))
  .delete(protect, adminProtect, asyncHandler(deleteUser));
router
  .route("/products")
  .post(protect, adminProtect, asyncHandler(createProduct));
router
  .route("/products/:id")
  .put(protect, adminProtect, asyncHandler(updateProduct))
  .delete(protect, adminProtect, asyncHandler(deleteProduct));
router.route("/orders").get(protect, adminProtect, asyncHandler(getOrders));

export default router;
