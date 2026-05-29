"use client";

import { useMutation } from "@tanstack/react-query";

import { updateCartQuantity } from "@/services/cartService";

import { useCartStore } from "@/store/cartStore";

export function useUpdateCartQuantity() {
  const updateCartQuantityStore = useCartStore(
    (state) => state.updateCartQuantity,
  );

  return useMutation({
    mutationFn: updateCartQuantity,

    onSuccess: (updatedItem) => {
      updateCartQuantityStore(updatedItem.cartItemId, updatedItem.quantity);
    },
  });
}
