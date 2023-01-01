import asyncHandler from "express-async-handler";
import OrderService from "../services/order.service.js";
import dotenv from "dotenv";

class OrderController {

  // @desc     Create new order
  // @route    POST /api/orders
  // @access   Private
  async createOrder(req, res) {
    try {
      const newOrder = await OrderService.create(req.user._id, req.body);
      res.status(201).json(newOrder);
    } catch (e) {
      res.status(500);
      throw new Error(e.message);
    }
  };

  // @desc     Get order by ID
  // @route    GET /api/orders/:id
  // @access   Private
  async getOrderById(req, res) {
    try {
      const order = await OrderService.getById(req.params.id);
      res.json(order);
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }
  };

  // @desc     Update status of order for paying
  // @route    PUT /api/orders/:id/pay
  // @access   Private
  async updateStatusOrderForPaying(req, res) {
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
  };

  // @desc     Update status of order for delivering
  // @route    PUT /api/orders/:id/deliver
  // @access   Private/Admin
  async updateStatusOrderForDelivering(req, res) {
      try {
        const updatedOrder = await OrderService.updateDeliveringStatus(
          req.params.id
        );
        res.json(updatedOrder);
      } catch (e) {
        res.status(404);
        throw new Error(e.message);
      }
    };

  // @desc     Get user's orders
  // @route    GET /api/orders/myorders
  // @access   Private
  async getMyOrders(req, res) {
    const myOrders = await OrderService.getMy(req.user._id);
    res.json(myOrders);
  };
};

export default new OrderController();
