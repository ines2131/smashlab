import { TrackableProduct, trackPurchase } from "./ecommerce";

function orderProductToTrackable(product: any): TrackableProduct {
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

export function trackOrderPurchase(order: {
  orderNumber: string;
  totalAmount: number;
  items: { product: any; quantity: number }[];
}) {
  const validItems = order.items.filter((item) => item.product != null);

  trackPurchase({
    orderNumber: order.orderNumber,
    totalAmount: order.totalAmount,
    items: validItems.map(({ product, quantity }) => ({
      product: orderProductToTrackable(product),
      quantity,
    })),
  });
}
