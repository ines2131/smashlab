import { addCartItem } from "@/services/cartService";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";

type addToCartInput = {
  product: Product;
  quantity: number;
};

export function useAddToCart() {
  const addCartItemToStore = useCartStore((state) => state.addCartItem);

  return useMutation<CartItem, Error, addToCartInput>({
    mutationFn: async ({ product, quantity }) => {
      return addCartItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    },

    onSuccess: (savedCartItem) => {
      addCartItemToStore(savedCartItem);
    },
  });
}
