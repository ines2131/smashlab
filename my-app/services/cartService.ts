import { CartItem, UpdateCartQuantityInput } from "@/types/cart";
import axios from "axios";

export async function addCartItem(cartItem: CartItem) {
  const response = await axios.post("/api/cart", cartItem);
  return response.data;
}

export async function getCartItems() {
  const response = await axios.get("/api/cart");
  return response.data;
}

export async function updateCartQuantity({
  _id,
  quantity,
}: UpdateCartQuantityInput) {
  const response = await axios.patch(`/api/cart/${_id}`, { quantity });
  return response.data;
}
