"use client";

import Button from "@/components/common/Button";
import { useAddToCart } from "@/hooks/useAddToCart";
import { trackAddToCart } from "@/lib/gtm/ecommerce";
import { CartProduct, TrackableProduct } from "@/types/cart";

type Props = {
  product: CartProduct;
  trackingData: TrackableProduct;
  quantity: number;
};

export default function AddToCartButton({
  product,
  trackingData,
  quantity,
}: Props) {
  const { mutate, isPending } = useAddToCart();

  return (
    <Button
      onClick={() =>
        mutate(
          {
            quantity,
            product,
          },
          {
            onSuccess: () => {
              trackAddToCart(trackingData, quantity);
            },
          },
        )
      }
      variant="secondary"
      disabled={isPending}
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
