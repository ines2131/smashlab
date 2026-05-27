import { getCartItems } from "@/services/cartService";
import { useCartStore } from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useCart() {
  const setCart = useCartStore((state) => state.setCart);
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  useEffect(() => {
    if (query.data) {
      setCart(query.data);
    }
  }, [query.data, setCart]);
  return query;
}
