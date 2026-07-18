"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
import Spinner from "@/components/common/Spinner";
import { useCart } from "@/hooks/useCart";
import { trackBeginCheckout } from "@/lib/tracking/ecommerce";
import { useCartStore } from "@/store/cartStore";
import { CheckoutFormData } from "@/types/checkout";
import { useEffect, useRef, useState } from "react";

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
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const hasTrackedRef = useRef(false);
  useEffect(() => {
    if (!isLoading && cart.length > 0 && !hasTrackedRef.current) {
      trackBeginCheckout(cart);
      hasTrackedRef.current = true;
    }
  }, [isLoading, cart, totalAmount]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-2xl font-bold tracking-tight">Checkout</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Shipping Info</h2>
            <CheckoutForm form={form} setForm={setForm} />
          </section>

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <OrderSummary cart={cart} totalAmount={totalAmount} />
            <div className="mt-6">
              <PlaceOrderButton form={form} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
