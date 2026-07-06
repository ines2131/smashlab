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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.category}/${product.slug}`}
            className="border rounded-lg p-3 hover:shadow"
          >
            <img
              src={product.image}
              className="h-40 w-full object-cover"
              alt={product.name}
            />

            <p className="mt-2 font-medium">{product.name}</p>

            <p className="text-sm text-gray-500">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
