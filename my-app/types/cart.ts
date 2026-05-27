export type CartItem = {
  _id: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type UpdateCartQuantityInput = {
  _id: string;
  quantity: number;
};
