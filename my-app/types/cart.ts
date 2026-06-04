export type CartItem = {
  _id: string;
  userId: string;
  productId: {
    _id: string;

    name: string;

    price: number;

    image: string;
  };
  quantity: number;
};

export type AddToCartInput = {
  productId: string;
  quantity: number;
};

export type UpdateCartQuantityInput = {
  _id: string;
  quantity: number;
};
