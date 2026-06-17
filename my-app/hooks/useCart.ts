import { getCartItems } from "@/services/cartService";
import { useCartStore } from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { AddToCartInput } from "@/types/cart";

export function useCart() {
  const setCart = useCartStore((state) => state.setCart);
  const { data: user } = useCurrentUser();
  const query = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      if (!user) {
        const guestCart: AddToCartInput[] = JSON.parse(
          localStorage.getItem("guest-cart") || "[]",
        );

        const normalized = guestCart.map((item) => ({
          _id: `guest-${item.productId}`,
          userId: "guest",

          productId: {
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
          },

          quantity: item.quantity,
        }));
        return normalized;
      }

      const data = await getCartItems();
      console.log(data, "싱크장바구니");
      return data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setCart(query.data);
    }
  }, [query.data, setCart]);
  return query;
}
