import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    productId: Number,
    name: String,
    price: Number,
    image: String,
    quantity: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
