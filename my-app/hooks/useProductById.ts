import { getProductById } from "@/services/productService";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useProductById(id: string) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}
