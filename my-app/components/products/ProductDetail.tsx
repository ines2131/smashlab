"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import PurchaseButton from "./PurchaseButton";
import QuantitySelector from "../common/QuantitySelector";
import { Product } from "@/types/product";
import { TrackableProduct } from "@/types/cart";

type Props = {
  product: Product;
  trackingData: TrackableProduct;
};

export default function ProductDetail({ product, trackingData }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const totalPrice = product.price * quantity;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* LEFT */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md aspect-[4/5] border rounded-lg p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p id="detail_price" className="text-xl font-semibold">
          ${totalPrice}
        </p>

        <p className="text-gray-500 text-sm">{product.description}</p>

        {/* 수량 */}
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

        {/* 버튼 */}
        <div className="flex gap-3 mt-6">
          <AddToCartButton
            product={product}
            quantity={quantity}
            trackingData={trackingData}
          />

          <PurchaseButton />
        </div>
      </div>
    </div>
  );
}
