import asyncHandler from "express-async-handler";
import OrderService from "../services/order.service.js";
import dotenv from "dotenv";

const orderController = {};

dotenv.config();

// @desc     Create new order
// @route    POST /api/orders
// @access   Private
orderController.createOrder = asyncHandler(async (req, res) => {
  try {
    const newOrder = await OrderService.create(req.user._id, req.body);
    res.status(201).json(newOrder);
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
orderController.getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await OrderService.getById(req.params.id);
    res.json(order);
  } catch (e) {
    res.status(404);
    throw new Error(e.message);
  }
});

// @desc     Update status of order for paying
// @route    PUT /api/orders/:id/pay
// @access   Private
orderController.updateStatusOrderForPaying = asyncHandler(async (req, res) => {
  try {
    const updatedOrder = await OrderService.updatePayingStatus(
      req.params.id,
      req.body
    );
    res.json(updatedOrder);
  } catch (e) {
    res.status(404);
    throw new Error(e.message);
  }
});

// @desc     Update status of order for delivering
// @route    PUT /api/orders/:id/deliver
// @access   Private/Admin
orderController.updateStatusOrderForDelivering = asyncHandler(
  async (req, res) => {
    try {
      const updatedOrder = await OrderService.updateDeliveringStatus(
        req.params.id
      );
      res.json(updatedOrder);
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }
  }
);

// @desc     Get user's orders
// @route    GET /api/orders/myorders
// @access   Private
orderController.getMyOrders = asyncHandler(async (req, res) => {
  const myOrders = await OrderService.getMy(req.user._id);
  res.json(myOrders);
});

// @desc     Paying Order through PayPal
// @route    GET /api/config/paypal
// @access   Public
orderController.payingOrder = (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
};

export default orderController;
