import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    customer: {
      name: String,
      address: String,
      phone: String,
      email: String,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: Number,

        price: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["bank", "card"],
      default: "card",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
