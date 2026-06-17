import { AddToCartInput } from "@/types/cart";

export function saveGuestCart(input: AddToCartInput) {
  const cart: AddToCartInput[] = JSON.parse(
    localStorage.getItem("guest-cart") || "[]",
  );

  const existing = cart.find((item) => item.product._id === input.product._id);

  if (existing) {
    existing.quantity += input.quantity;
  } else {
    cart.push(input);
  }

  localStorage.setItem("guest-cart", JSON.stringify(cart));

  return cart;
}
