import express from 'express';
import orderController from '../controllers/order.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

const { createOrder, getOrderById, updateStatusOrderForPaying } = orderController;

router.route("/")
    .post(protect, createOrder);
router.route("/:id")
    .get(protect, getOrderById);
router.route("/:id/pay")
    .put(protect, updateStatusOrderForPaying);

export default router;