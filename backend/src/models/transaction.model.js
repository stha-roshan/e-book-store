import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "successfull", "failed"],
    default: "pending",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export { Transaction };
