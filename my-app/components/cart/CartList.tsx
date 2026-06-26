"use client";

import Button from "@/components/common/Button";
import QuantitySelector from "@/components/common/QuantitySelector";
import ProceedButton from "./ProceedButton";
import { useCartStore } from "@/store/cartStore";
import { useCart } from "@/hooks/useCart";
import { useUpdateCartQuantity } from "@/hooks/useUpdateCartQuantity";

export default function CartList() {
  useCart();

  const cart = useCartStore((state) => state.cart);

  console.log(cart, "카트리스트아이템");

  const { mutate } = useUpdateCartQuantity();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 border rounded-xl p-5"
            >
              {/* IMAGE */}
              <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.product.name}</h2>

                <p className="font-semibold mt-3">${item.product.price}</p>
              </div>

              {/* QUANTITY */}
              <QuantitySelector
                quantity={item.quantity}
                setQuantity={(value) => {
                  const newQuantity =
                    typeof value === "function" ? value(item.quantity) : value;

                  mutate({
                    _id: item._id,
                    quantity: newQuantity,
                  });

                  console.log(newQuantity);
                }}
                showLabel={false}
              />

              {/* TOTAL */}
              <div className="w-24 text-right font-bold">
                ${item.productId.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="border rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="flex gap-2 mb-6">
            <input
              placeholder="Coupon code"
              className="border rounded-md px-3 py-2 flex-1"
            />

            <Button>Apply</Button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>

              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>

              <span>${subtotal}</span>
            </div>
          </div>

          <div className="mt-6">
            <ProceedButton />
          </div>
        </div>
      </div>
    </div>
  );
}
