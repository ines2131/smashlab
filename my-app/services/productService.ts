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
