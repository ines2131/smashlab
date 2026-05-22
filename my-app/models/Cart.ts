import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
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
