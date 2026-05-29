import { create } from "zustand";

import { CartItem } from "@/types/cart";

type CartStore = {
  cart: CartItem[];

  setCart: (items: CartItem[]) => void;

  addCartItem: (item: CartItem) => void;

  updateCartQuantity: (id: string, quantity: number) => void;

  removeCartItem: (id: string) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  setCart: (items) =>
    set({
      cart: items,
    }),

  addCartItem: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.productId === item.productId,
      );

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.productId === item.productId
              ? {
                  ...cartItem,
                  quantity: Number(cartItem.quantity) + Number(item.quantity),
                }
              : cartItem,
          ),
        };
      }

      return {
        cart: [...state.cart, item],
      };
    }),

  updateCartQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.cartItemId === id
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    })),

  removeCartItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.cartItemId !== id),
    })),

  clearCart: () =>
    set({
      cart: [],
    }),
}));
