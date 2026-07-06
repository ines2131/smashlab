import { getProductByCategory } from "@/services/productService";
import ProductsByCategory from "@/components/products/ProductsByCategory";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;
  const products = await getProductByCategory(category);

  return <ProductsByCategory category={category} products={products} />;
}
