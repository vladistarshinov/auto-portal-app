import Order from "../models/order.model.js";

class OrderService {
  async create(userId, data) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      productsPrice,
      shipingPrice,
      taxPrice,
      totalPrice,
    } = data;

    if (orderItems && orderItems.length === 0) {
      //res.status(400);
      throw new Error("Нет товаров для заказа");
    } else {
      const order = new Order({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        productsPrice,
        shipingPrice,
        taxPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      return createdOrder;
    }
  }

  async getById(id) {
    const order = await Order.findById(id).populate("user", "name email");

    if (order) {
      return order;
    } else {
      throw new Error(`Заказ ${id} не найден`);
    }
  }

  async updatePayingStatus(orderId, data) {
    const order = await Order.findById(orderId);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: data.id,
        status: data.status,
        update_time: data.update_time,
        email_address: data.payer.email_address,
      };

      const updatedOrder = await order.save();
      return updatedOrder;
    } else {
      throw new Error(`Заказ ${orderId} не найден`);
    }
  }

  async updateDeliveringStatus(orderId) {
    const order = await Order.findById(orderId);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      return updatedOrder;
    } else {
      throw new Error(`Заказ ${orderId} не найден`);
    }
  }

  async getMy(userId) {
    const myOrders = await Order.find({ user: userId });
		return myOrders;
  }
}

export default new OrderService();
