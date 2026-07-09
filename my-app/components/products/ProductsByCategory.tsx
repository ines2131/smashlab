import { Product } from "@/types/product";
import Link from "next/link";

type Props = {
  category: string;
  products: Product[];
};

export default function ProductsByCategory({ category, products }: Props) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold capitalize">{category}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.category}/${product.slug}`}
            className="border flex flex-col items-center w-ful rounded-lg p-3 hover:shadow"
          >
            <img
              src={product.image}
              className="h-[180px] bg-gray-200 mb-2"
              alt={product.name}
            />

            <p className="mt-2 text-md font-bold text-gray-500">
              {product.name}
            </p>

            <p className="text-sm font-medium">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
