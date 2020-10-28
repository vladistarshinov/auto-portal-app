import express from 'express';
import orderController from '../controllers/order.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

const { createOrder } = orderController;

router.route("/")
    .post(protect, createOrder);

export default router;