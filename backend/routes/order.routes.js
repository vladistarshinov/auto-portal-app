import express from 'express';
import orderController from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminProtect } from '../middleware/admin.middleware.js';

const router = express.Router();

const { createOrder, 
        getOrderById, 
        updateStatusOrderForPaying, 
        updateStatusOrderForDelivering, 
        getMyOrders } = orderController;

router.route("/")
    .post(protect, createOrder);
router.route("/my-orders")
    .get(protect, getMyOrders);
router.route("/:id")
    .get(protect, getOrderById);
router.route("/:id/pay")
    .put(protect, updateStatusOrderForPaying);
router.route("/:id/deliver")
    .put(protect, adminProtect, updateStatusOrderForDelivering);

export default router;