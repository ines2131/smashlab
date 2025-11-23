"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    try {
      const { orderId } = await (
        await fetch("/api/orders", { method: "POST" })
      ).json();
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      if (!res.ok) throw new Error("Failed to init session");
      const { url } = await res.json();
      window.location.href = url;
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Demo Coffee</p>
            <p className="text-sm text-gray-500">1 × $9.90</p>
          </div>
          <p className="font-semibold">$9.90</p>
        </div>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Pay with Stripe"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      <div className="mt-6 text-sm text-gray-600">
        <p className="font-medium">Stripe Test Cards</p>
        <ul className="list-disc ml-5">
          <li>
            Success: <code>4242 4242 4242 4242</code> (any future expiry, any
            CVC)
          </li>
          <li>
            3DS: <code>4000 0025 0000 3155</code>
          </li>
          <li>
            Decline: <code>4000 0000 0000 9995</code>
          </li>
        </ul>
      </div>
    </main>
  );
}
