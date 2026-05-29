"use client";

import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

export default function ProductCard() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Failed to load products</p>;

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {products?.map((product) => (
        <Link
          key={product._id}
          href={`/product/${product._id}`}
          className="cursor-pointer border p-4 rounded-md"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-[150px] bg-gray-200 mb-2"
          />
          <p className="text-xs text-gray-500">{product.name}</p>
          <p className="text-sm font-medium"> ${product.price}</p>
        </Link>
      ))}
    </div>
  );
}
