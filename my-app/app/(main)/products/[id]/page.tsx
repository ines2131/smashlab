import ProductDetail from "@/components/products/ProductDetail";
import { Product } from "@/types/product";

export default async function ProductPage() {
  // 나중에 MongoDB fetch로 교체 가능

  const product: Product = {
    _id: "123",
    productId: 1,
    name: "Yonex Vcore 100L",
    price: 180,
    image: "/racket.jpg",
    description:
      "Lightweight racket designed for control and spin. Perfect for intermediate players.",
  };

  return <ProductDetail product={product} />;
}
