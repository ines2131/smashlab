import { ViewItemTracker } from "@/components/analytics/ViewItemTracker";
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

  return (
    <>
      <ViewItemTracker
        product={{
          sku: product.sku,
          name: product.name,
          brand: product.brand,
          category: product.category,
          subcategory: product.subcategory,
          variant: product.variant,
          price: product.price,
        }}
      />
      <ProductDetail product={product} />;
    </>
  );
}
