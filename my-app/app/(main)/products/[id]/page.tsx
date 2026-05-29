import ProductDetail from "@/components/products/ProductDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductsPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
