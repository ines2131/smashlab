"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cartStore";
import { CheckoutFormData } from "@/types/checkout";
import { useState } from "react";

export default function CheckoutPage() {
  const { isLoading } = useCart();

  const cart = useCartStore((state) => state.cart);

  const [form, setForm] = useState<CheckoutFormData>({
    name: "",
    address: "",
    phone: "",
    email: "",
    paymentMethod: "",
  });

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0,
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Billing Details</h2>
        <CheckoutForm form={form} setForm={setForm} />
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between">
              <div>
                {" "}
                <p> {item.productId.name} </p>{" "}
                <p className="text-sm text-gray-500">
                  {" "}
                  Qty: {item.quantity}{" "}
                </p>{" "}
              </div>
              <p> $ {(item.productId.price * item.quantity).toFixed(2)} </p>
            </div>
          ))}
        </div>
        <hr className="my-4" />{" "}
        <div className="flex justify-between font-bold">
          {" "}
          <span>Total</span> <span> $ {totalAmount.toFixed(2)} </span>{" "}
        </div>{" "}
        <div className="mt-6">
          {" "}
          <PlaceOrderButton form={form} />{" "}
        </div>
      </div>
    </div>
  );
}
