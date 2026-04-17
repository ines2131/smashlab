"use client";

import { useRouter } from "next/navigation";

export default function ProductCard() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/product-detail")}
      className="cursor-pointer border p-4 rounded-md"
    >
      <div className="h-[150px] bg-gray-200 mb-2" />
      <p className="text-xs text-gray-500">Category</p>
      <p className="text-sm font-medium">Yonex Vcore 100L</p>
    </div>
  );
}
