import Button from "@/components/common/Button";
import QuantitySelector from "./QuantitySelector";
import ProceedButton from "./ProceedButton";

export default function Cart() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-xl font-bold mb-6">Cart</h2>

      {/* 리스트 */}
      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="grid grid-cols-4 items-center border p-4 rounded-md"
          >
            <p>Yonex Vcore</p>
            <p>$180</p>

            <div>
              <QuantitySelector />
            </div>

            <p>$180</p>
          </div>
        ))}
      </div>

      {/* 쿠폰 + 총합 */}
      <div className="grid grid-cols-2 gap-6 mt-10">
        <div className="flex gap-2">
          <input
            placeholder="Coupon code"
            className="border px-3 py-2 flex-1"
          />
          <Button>Apply</Button>
        </div>

        <div className="border p-4 rounded-md">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>$360</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span>$0</span>
          </p>

          <hr className="my-3" />

          <p className="flex justify-between font-bold">
            <span>Total</span>
            <span>$360</span>
          </p>

          <ProceedButton />
        </div>
      </div>
    </div>
  );
}
