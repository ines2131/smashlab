export type CartItem = {
  userId: string;
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type AddToCartInput = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type UpdateCartQuantityInput = {
  cartItemId: string;
  quantity: number;
};
