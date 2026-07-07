import "server-only";

import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import type { Product as ProductType } from "@/types/product";

export async function getProductByCategory(
  category: string,
): Promise<ProductType[]> {
  if (!category) {
    throw new Error("Category is required.");
  }

  await connectDB();

  const products = await Product.find({ category }).lean();

  return products as ProductType[];
}

export async function getProductBySlug(
  category: string,
  slug: string,
): Promise<ProductType> {
  if (!category || !slug) {
    throw new Error("Category and slug are required.");
  }

  await connectDB();

  const product = await Product.findOne({ category, slug }).lean();

  return {
    ...product,
    _id: product._id.toString(),
  };
}
