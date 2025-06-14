import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

const createOrder = async (req, res) => {
  try {
    const { product, transaction } = req.body;
    const user = req.user;
    // console.log("req.user ==>", req.user);

    if (!product) {
      console.log("Product is required");
      return res.status(400).json({
        success: false,
        message: "Product is required",
      });
    }

    const productData = await Product.findById(product).select("price");
    const price = productData?.price;
    const totalAmount = price + 10;

    if (!transaction) {
      console.log("Transaction is required");
      return res.status(400).json({
        success: false,
        message: "Transaction is required",
      });
    }

    const newOrder = await Order.create({
      user: user._id,
      product: product,
      transaction: transaction,
      price: price,
      totalAmount: totalAmount,
      status: "placed",
    });

    const createdOrder = await Order.findById(newOrder._id)
      .populate("user", "name email") 
      .populate("product", "title price image") 
      .populate("transaction");
    if (!createdOrder) {
      console.log("Order not created");
      return res.status(500).json({
        success: false,
        message: "Order not created",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Order creation error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

export { createOrder };
