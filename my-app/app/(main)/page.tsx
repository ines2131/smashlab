import ProductCard from "@/components/main/ProductCard";
import Image from "next/image";

export default function Main() {
  return (
    <div>
      {/* Hero */}
      <div className="h-[350px] bg-orange-200 flex items-center justify-center relative">
        <Image src="/hero-2.avif" alt="hero" fill className="object-cover" />
      </div>

      <ProductCard />
    </div>
  );
}
