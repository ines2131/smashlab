import {
  AddToCartInput,
  CartItem,
  UpdateCartQuantityInput,
} from "@/types/cart";
import axios from "axios";

export async function addCartItem(cartItem: AddToCartInput) {
  const response = await axios.post<CartItem>("/api/cart", cartItem);
  return response.data;
}

export async function getCartItems() {
  const response = await axios.get<CartItem[]>("/api/cart");
  return response.data;
}

export async function updateCartQuantity({
  cartItemId,
  quantity,
}: UpdateCartQuantityInput) {
  const response = await axios.patch<CartItem>(`/api/cart/${cartItemId}`, {
    quantity,
  });
  return response.data;
}
