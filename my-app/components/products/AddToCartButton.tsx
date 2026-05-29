"use client";

import Button from "@/components/common/Button";

import { Product } from "@/types/product";

import { useAddToCart } from "@/hooks/useAddToCart";

type Props = {
  product: Product;
  quantity: number;
};

export default function AddToCartButton({ product, quantity }: Props) {
  const { mutate, isPending } = useAddToCart();

  return (
    <Button
      onClick={() =>
        mutate({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        })
      }
      variant="secondary"
      disabled={isPending}
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
