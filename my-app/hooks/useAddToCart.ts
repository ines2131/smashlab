"use client";

import { addCartItem } from "@/services/cartService";
import { useCartStore } from "@/store/cartStore";
import { AddToCartInput, CartItem } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAddToCart() {
  const router = useRouter();
  const addCartItemToStore = useCartStore((state) => state.addCartItem);

  return useMutation<CartItem, Error, AddToCartInput>({
    mutationFn: async (input) => {
      return addCartItem(input);
    },

    onSuccess: (savedCartItem) => {
      addCartItemToStore(savedCartItem);

      toast.success("Added to cart", {
        description: savedCartItem.name,

        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    },
  });
}
