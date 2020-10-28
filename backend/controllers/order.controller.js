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
        priceItems,
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
                priceItems,
                shipingPrice,
                taxPrice,
                totalPrice
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
});

export default orderController;