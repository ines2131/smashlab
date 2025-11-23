import Stripe from "stripe";

type SearchParams = Promise<{ session_id?: string }>;

export default async function PaymentComplete({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const { session_id } = await searchParams;
  if (!session_id) {
    return (
      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Payment Complete</h1>
        <p className="text-red-600">Missing session_id.</p>
      </main>
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-10-29.clover",
  });

  // Expand for richer info (e.g., payment_intent status, amount, email)
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent", "customer_details"],
  });

  const pi = session.payment_intent as Stripe.PaymentIntent | null;
  const status = pi?.status ?? session.status;

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Thank you! 🎉</h1>
      <p className="mb-1">
        Payment status: <b>{status}</b>
      </p>
      <p className="mb-1">
        Amount: ${(session.amount_total ?? 0) / 100}{" "}
        {session.currency?.toUpperCase()}
      </p>
      <p className="mb-4">Email: {session.customer_details?.email ?? "-"}</p>

      <p className="text-sm text-gray-500">Session ID: {session.id}</p>
    </main>
  );
}
