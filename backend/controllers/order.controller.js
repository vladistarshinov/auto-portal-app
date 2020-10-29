import asyncHandler from 'express-async-handler';
import Order from '../models/order.model';

const orderController = {};

// @desc     Create new order
// @route    POST /api/orders
// @access   Private
orderController.createOrder = asyncHandler(async (req, res) => {
    const { orderItems,
        shippingAddress,
        paymentMethod,
        productsPrice,
        shipingPrice,
        taxPrice,
        totalPrice } = req.body;
    
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("Нет товаров для заказа");
            return;
        } else {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                productsPrice,
                shipingPrice,
                taxPrice,
                totalPrice
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
});

// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
orderController.getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error(`Заказ ${req.params.id} не найден`);
    }
});

export default orderController;