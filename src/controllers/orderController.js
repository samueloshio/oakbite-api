import Order from '../models/OrderModel.js';

export const placeOrder = async (req, res, next) => {
  try {
    const newOrder = new Order({
      ...req.body,
      userId: req.user.id,
    });
    await newOrder.save();

    const orderId = newOrder._id;

    res
      .status(201)
      .json({ status: true, message: 'Order placed successfully', orderId });
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  const userId = req.user.id;
  const { paymentStatus, orderStatus } = req.query;
  let query = { userId };
  if (paymentStatus) {
    query.paymentStatus = paymentStatus;
  }
  if (orderStatus === orderStatus) {
    query.orderStatus = orderStatus;
  }
  try {
    const orders = await Order.find(query).populate({
      path: 'orderItems.foodId',
      select: 'imageUrl title rating time',
    });

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
