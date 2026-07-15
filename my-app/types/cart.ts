export type CartItem = {
  _id: string;
  userId: string;
  product: CartProduct;
  quantity: number;
};

export type AddToCartInput = {
  product: CartProduct;
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

export type TrackableProduct = {
  sku: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  variant?: string;
  price: number;
};
