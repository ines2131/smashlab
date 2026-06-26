"use client";

import { addCartItem } from "@/services/cartService";
import { useCartStore } from "@/store/cartStore";
import { AddToCartInput, CartItem } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentUser } from "./useCurrentUser";
import { saveGuestCart } from "@/util/saveGuestCart";

export function useAddToCart() {
  const router = useRouter();
  const addCartItemToStore = useCartStore((state) => state.addCartItem);
  const { data: user } = useCurrentUser();

  return useMutation<CartItem | null, Error, AddToCartInput>({
    mutationFn: async (input) => {
      if (!user) {
        saveGuestCart(input);
        return null;
      }
      return addCartItem(input);
    },

    onSuccess: (savedCartItem) => {
      if (!savedCartItem) {
        toast.success("Added to guest cart");
        return;
      }
      addCartItemToStore(savedCartItem);

      toast.success("Added to cart", {
        description: savedCartItem.product.name,

        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    },
  });
}
