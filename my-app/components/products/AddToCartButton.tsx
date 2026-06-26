"use client";

import Button from "@/components/common/Button";

import { Product } from "@/types/product";

import { useAddToCart } from "@/hooks/useAddToCart";

type Props = {
  product: Product;
  quantity: number;
  productId: string;
};

export default function AddToCartButton({
  product,
  productId,
  quantity,
}: Props) {
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
