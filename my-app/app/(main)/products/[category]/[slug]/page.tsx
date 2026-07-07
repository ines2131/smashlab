import ProductDetail from "@/components/products/ProductDetail";
import { getProductBySlug } from "@/services/productService.server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function SlugPage({ params }: Props) {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
