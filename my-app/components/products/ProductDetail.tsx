"use client";

import { useState } from "react";

import { Product } from "@/types/product";

import AddToCartButton from "./AddToCartButton";
import PurchaseButton from "./PurchaseButton";
import QuantitySelector from "./QantitySelector";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const totalPrice = product.price * quantity;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 gap-10">
      {/* LEFT */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md border rounded-lg p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-contain"
          />
        </div>

        <div className="flex gap-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-16 h-16 border rounded-md bg-gray-100" />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="text-xl font-semibold">${totalPrice}</p>

        <p className="text-gray-500 text-sm">{product.description}</p>

        {/* 옵션 */}
        <div className="mt-4">
          <p className="text-sm mb-1">Grip Size</p>

          <select className="border rounded-md px-3 py-2 w-40">
            <option>G2</option>
            <option>G3</option>
          </select>
        </div>

        {/* 수량 */}
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

        {/* 버튼 */}
        <div className="flex gap-3 mt-6">
          <AddToCartButton product={product} quantity={quantity} />

          <PurchaseButton />
        </div>
      </div>
    </div>
  );
}
