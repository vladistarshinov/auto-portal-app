import express from "express";
import OrderController from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminProtect } from "../middleware/admin.middleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

const {
  createOrder,
  getOrderById,
  updateStatusOrderForPaying,
  updateStatusOrderForDelivering,
  getMyOrders,
} = OrderController;

router.route("/").post(protect, asyncHandler(createOrder));
router.route("/my-orders").get(protect, asyncHandler(getMyOrders));
router.route("/:id").get(protect, asyncHandler(getOrderById));
router.route("/:id/pay").put(protect, asyncHandler(updateStatusOrderForPaying));
router
  .route("/:id/deliver")
  .put(protect, adminProtect, asyncHandler(updateStatusOrderForDelivering));

export default router;
