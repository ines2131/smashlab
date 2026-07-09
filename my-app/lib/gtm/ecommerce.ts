declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export type TrackableProduct = {
  sku: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  variant?: string;
  price: number;
};

export function trackViewItem(product: TrackableProduct) {
  pushToDataLayer({ eecommerce: null });
  pushToDataLayer({
    event: "view_item",
    ecommerce: {
      currency: "HKD",
      value: product.price,
      items: [
        {
          item_id: product.sku,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          ...(product.subcategory && { item_category2: product.subcategory }),
          ...(product.variant && { item_variant: product.variant }),
          price: product.price,
          quantity: 1,
        },
      ],
    },
  });
}
