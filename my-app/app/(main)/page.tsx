import ProductCard from "@/components/main/ProductCard";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="h-[300px] bg-orange-200 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Tennis & Padel Gear</h1>
      </div>

      <div className="grid grid-cols-4 gap-6 p-6">
        {[1, 2, 3, 4].map((item) => (
          <ProductCard key={item} />
        ))}
      </div>
    </div>
  );
}
