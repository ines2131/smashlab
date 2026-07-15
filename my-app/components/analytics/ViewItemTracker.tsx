"use client";

import { TrackableProduct, trackViewItem } from "@/lib/tracking/ecommerce";
import { useEffect } from "react";

export function ViewItemTracker({ product }: { product: TrackableProduct }) {
  useEffect(() => {
    trackViewItem(product);
  }, [product.sku]);

  return null;
}
