import CheckoutForm from "./CheckoutForm";
import PlaceOrderButton from "./PlaceOrderButton";

export default function Checkout() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 gap-10">
      <CheckoutForm />

      {/* RIGHT - Summary */}
      <div className="border p-6 rounded-md">
        <p className="flex justify-between mb-2">
          <span>Yonex Vcore</span>
          <span>$180</span>
        </p>

        <p className="flex justify-between mb-2">
          <span>Yonex Ezone</span>
          <span>$180</span>
        </p>

        <hr className="my-3" />

        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>$360</span>
        </p>

        <p className="flex justify-between">
          <span>Shipping</span>
          <span>$0</span>
        </p>

        <p className="flex justify-between font-bold mt-2">
          <span>Total</span>
          <span>$360</span>
        </p>

        {/* 결제 */}
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            Bank
          </label>

          <label className="flex items-center gap-2 mt-2">
            <input type="radio" name="payment" defaultChecked />
            Card
          </label>
        </div>
        <PlaceOrderButton />
      </div>
    </div>
  );
}
