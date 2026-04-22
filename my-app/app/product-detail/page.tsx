import AddToCartButton from "./AddToCartButton";
import PurchaseButton from "./PurchaseButton";

export default function ProductDetail() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 gap-10">
      {/* LEFT - 이미지 */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md border rounded-lg p-6">
          <img
            src="/racket.jpg"
            alt="racket"
            className="w-full object-contain"
          />
        </div>

        {/* 썸네일 */}
        <div className="flex gap-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-16 h-16 border rounded-md bg-gray-100" />
          ))}
        </div>
      </div>

      {/* RIGHT - 정보 */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Yonex Vcore 100L</h1>

        <p className="text-xl font-semibold">$180</p>

        <p className="text-gray-500 text-sm">
          Lightweight racket designed for control and spin. Perfect for
          intermediate players.
        </p>

        {/* 옵션 */}
        <div className="mt-4">
          <p className="text-sm mb-1">Grip Size</p>
          <select className="border rounded-md px-3 py-2 w-40">
            <option>G2</option>
            <option>G3</option>
          </select>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 mt-6">
          <AddToCartButton />
          <PurchaseButton />
        </div>
      </div>
    </div>
  );
}
