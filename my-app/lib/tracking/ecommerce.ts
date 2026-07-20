import { CartItem, CartProduct } from "@/types/cart";
import { pushToDataLayer } from "./dataLayer";

const CURRENCY = "HKD";

export type TrackableProduct = {
  sku: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  variant?: string;
  price: number;
};

type TrackableItem = {
  product: TrackableProduct;
  quantity: number;
};

export type TrackableOrderItem = {
  product: TrackableProduct;
  quantity: number;
};

export type TrackableOrder = {
  orderNumber: string;
  totalAmount: number;
  items: TrackableOrderItem[];
};

function buildGa4Item({ product, quantity }: TrackableItem, index?: number) {
  return {
    item_id: product.sku,
    item_name: product.name,
    price: product.price,
    quantity,
    ...(product.brand && { item_brand: product.brand }),
    ...(product.category && { item_category: product.category }),
    ...(product.subcategory && { item_category2: product.subcategory }),
    ...(product.variant && { item_variant: product.variant }),
    ...(index !== undefined && { index }),
  };
}

function pushEcommerceEvent(
  event: string,
  value: number,
  items: ReturnType<typeof buildGa4Item>[],
  transaction_id?: string,
) {
  pushToDataLayer({ ecommerce: null });
  pushToDataLayer({
    event,
    ecommerce: {
      currency: CURRENCY,
      value,
      items,
      ...(transaction_id && { transaction_id }),
    },
  });
}

export function trackViewItem(product: TrackableProduct) {
  pushEcommerceEvent("view_item", product.price, [
    buildGa4Item({ product, quantity: 1 }),
  ]);
}

export function trackAddToCart(product: TrackableProduct, quantity: number) {
  pushEcommerceEvent("add_to_cart", product.price * quantity, [
    buildGa4Item({ product, quantity }),
  ]);
}

function cartProductToTrackable(product: CartProduct): TrackableProduct {
  return {
    sku: product.sku,
    name: product.name,
    price: product.price,
    brand: product.brand,
    category: product.category,
    subcategory: product.subcategory,
    variant: product.variant,
  };
}

export function trackBeginCheckout(cart: CartItem[]) {
  const items = cart.map(({ product, quantity }) => ({
    product: cartProductToTrackable(product),
    quantity,
  }));

  const value = items.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  );

  pushEcommerceEvent(
    "begin_checkout",
    value,
    items.map((item, index) => buildGa4Item(item, index)),
  );
}

export function trackPurchase(order: TrackableOrder) {
  pushEcommerceEvent(
    "purchase",
    order.totalAmount,
    order.items.map((item, index) => buildGa4Item(item, index)),
    order.orderNumber,
  );
}
