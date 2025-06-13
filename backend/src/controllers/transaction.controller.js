import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const createTransaction = async (req, res) => {
  //product id from body
  //user from req.user

  try {
    const { productId } = req.body;
    const user = req.user;
    console.log(user);
    console.log(productId)
    console.log(req.body)
    const product = await Product.findById(productId);
    if (!product) {
      console.log(
        `Not the valid product || product Not found of productId ${productId}`
      );
      return res.status(400).json({
        success: false,
        message: "Product Id incorrect || Product not found",
      });
    }

    const amount = product.price;

    const newTransaction = await Transaction.create({
      user: user._id,
      product: product._id,
      amount: amount,
      status: "pending",
    });

    const createdTransaction = await Transaction.findById(newTransaction._id);
    if (!createdTransaction) {
      console.log(`Transaction creation failed`);
      return res.status(500).json({
        success: false,
        message: "An error occured while creating transaction",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction created successfully",
      transaction: createdTransaction,
    });
  } catch (error) {
    console.error("Transaction creation error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error creating Transaction",
    });
  }
};

export { createTransaction }