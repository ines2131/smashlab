"use client";

import Button from "@/components/common/Button";

export default function AddToCartButton() {
  const handleAddToCart = () => {
    console.log("add to cart");
  };
  return (
    <Button onClick={handleAddToCart} variant="secondary">
      Add to Cart
    </Button>
  );
}
