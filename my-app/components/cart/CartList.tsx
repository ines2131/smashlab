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

  const { mutate } = useUpdateCartQuantity();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 lg:gap-10">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item._id} className="border rounded-xl p-4 sm:p-5">
              <div className="flex gap-4 sm:items-center">
                {/* IMAGE */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-base sm:text-lg truncate">
                    {item.product.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 sm:hidden">
                    ${item.product.price.toLocaleString()}
                  </p>

                  <p className="hidden sm:block font-semibold mt-3">
                    ${item.product.price.toLocaleString()}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-6">
                  <QuantitySelector
                    quantity={item.quantity}
                    setQuantity={(value) => {
                      const newQuantity =
                        typeof value === "function"
                          ? value(item.quantity)
                          : value;

                      mutate({ _id: item._id, quantity: newQuantity });
                    }}
                  />

                  <div className="w-24 text-right font-bold">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex sm:hidden items-center justify-between mt-4 pt-4 border-t">
                <QuantitySelector
                  quantity={item.quantity}
                  setQuantity={(value) => {
                    const newQuantity =
                      typeof value === "function"
                        ? value(item.quantity)
                        : value;

                    mutate({ _id: item._id, quantity: newQuantity });
                  }}
                />

                <div className="text-right">
                  <p className="font-bold text-lg">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="border rounded-xl p-5 sm:p-6 h-fit lg:sticky lg:top-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
            Order Summary
          </h2>

          {/* <div className="flex gap-2 mb-6">
            <input
              placeholder="Coupon code"
              className="border rounded-md px-3 py-2 flex-1"
            />

            <Button>Apply</Button>
          </div> */}

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
