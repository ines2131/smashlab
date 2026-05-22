import { create } from "zustand";

import { CartItem } from "@/types/cart";

type CartStore = {
  cart: CartItem[];

  setCart: (items: CartItem[]) => void;

  addCartItem: (item: CartItem) => void;
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
                  quantity: cartItem.quantity + item.quantity,
                }
              : cartItem,
          ),
        };
      }

      return {
        cart: [...state.cart, item],
      };
    }),
}));
