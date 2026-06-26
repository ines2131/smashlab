import { Product } from "./product";

export type CartItem = {
  _id: string;
  userId: string;
  product: Product;
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
