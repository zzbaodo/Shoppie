import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//@desc         Create new order
//@route        POST /api/orders/
//@access       Private

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc         Get Order by Id
//@route        Get /api/orders/:id
//@access       Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

//@desc         Update order to Paid
//@route        Get /api/orders/:id/pay
//@access       Private

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

//@desc         Get logged in user orders
//@route        Get /api/orders/myorders
//@access       Private

export const getMyOders = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

//@desc         Get All order
//@route        Get /api/orders/
//@access       Private/Admin

export const getOders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

//@desc         Update order to Delivered
//@route        Get /api/orders/:id/delivered
//@access       Private

export const updateOrderToDelivererd = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});
