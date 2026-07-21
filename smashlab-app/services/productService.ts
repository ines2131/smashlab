import { api } from "../lib/api";
import { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get("/api/products");
  return data;
}

export async function getProduct(value: string): Promise<Product> {
  const { data } = await api.get(`/api/products/${value}`);
  return data;
}
