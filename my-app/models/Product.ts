import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["rackets", "apparel", "footwear", "gear"],
    },

    subcategory: {
      type: String,
      trim: true,
    },

    variant: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
