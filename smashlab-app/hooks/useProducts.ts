import { getProducts } from "../services/productService";
import { Product } from "../types/product";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
