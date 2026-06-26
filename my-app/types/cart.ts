import { Product } from "./product";

export type CartItem = {
  _id: string;
  userId: string;
  product: CartProduct;
  quantity: number;
};

export type GuestCartItme = {
  product: Product;
  quantity: number;
};

export type AddToCartInput = {
  product: Product;
  quantity: number;
};

export type UpdateCartQuantityInput = {
  _id: string;
  quantity: number;
};

export type CartProduct = {
  _id: string;
  name: string;
  price: number;
  image: string;
};
