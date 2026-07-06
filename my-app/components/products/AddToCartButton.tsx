"use client";

import Button from "@/components/common/Button";
import { useAddToCart } from "@/hooks/useAddToCart";
import { CartProduct } from "@/types/cart";

type Props = {
  product: CartProduct;
  quantity: number;
};

export default function AddToCartButton({ product, quantity }: Props) {
  const { mutate, isPending } = useAddToCart();

  return (
    <Button
      onClick={() =>
        mutate({
          quantity,
          product,
        })
      }
      variant="secondary"
      disabled={isPending}
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
