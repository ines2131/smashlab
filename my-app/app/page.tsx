import Image from "next/image";
import ProductCard from "./ProductCard";

export default function Main() {
  return (
    <div>
      {/* Hero */}
      <div className="h-[350px] bg-orange-200 flex items-center justify-center relative">
        <Image src="/hero-2.avif" alt="hero" fill className="object-cover" />
      </div>

      <div className="grid grid-cols-4 gap-6 p-6">
        {[1, 2, 3, 4].map((item) => (
          <ProductCard key={item} />
        ))}
      </div>
    </div>
  );
}
