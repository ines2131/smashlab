import { Product } from "@/types/product";
import axios from "axios";

export async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get("/api/products");
  return data;
}

export async function getProduct(value: string): Promise<Product> {
  const { data } = await axios.get(`/api/products/${value}`);
  return data;
}

export async function getProductByCategory(
  category: string,
): Promise<Product[]> {
  if (!category) {
    throw new Error("Category is required");
  }
  const { data } = await axios.get(
    `http://localhost:3000/api/products?category=${category}`,
  );
  return data;
}

export async function getProductBySlug(
  category: string,
  slug: string,
): Promise<Product> {
  const { data } = await axios.get(
    `/api/products?category=${category}/slug=${slug}`,
  );
  return data;
}
