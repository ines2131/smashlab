import { Product } from "@/types/product";
import axios from "axios";

export async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get("/api/products");
  return data;
}

export async function getProductById(id: string): Promise<Product> {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
}
