"use client";

import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import Spinner from "../common/Spinner";

export default function ProductCard() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    );

  if (error) return <p>Failed to load products</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 p-6">
      {products?.map((product) => (
        <Link
          key={product._id}
          href={`/products/${product.category}/${product.slug}`}
          className="cursor-pointer border p-4 rounded-md flex flex-col items-center w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-[180px] bg-gray-200 mb-2"
          />
          <p className="text-md font-bold text-gray-500">{product.name}</p>
          <p className="text-sm font-medium"> ${product.price}</p>
        </Link>
      ))}
    </div>
  );
}
