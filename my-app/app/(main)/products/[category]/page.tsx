import ProductsByCategory from "@/components/products/ProductsByCategory";
import { getProductByCategory } from "@/services/productService.server";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;
  const products = await getProductByCategory(category);

  return <ProductsByCategory category={category} products={products} />;
}
