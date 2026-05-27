"use client";

import { addCartItem } from "@/services/cartService";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type addToCartInput = {
  product: Product;
  quantity: number;
};

export function useAddToCart() {
  const router = useRouter();
  const addCartItemToStore = useCartStore((state) => state.addCartItem);

  return useMutation<CartItem, Error, addToCartInput>({
    mutationFn: async ({ product, quantity }) => {
      return addCartItem({
        _id: product._id,
        productId: product.productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
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
