import Stripe from "stripe";
import { getDb } from "@/app/lib/mongo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: Request) {
  const { orderId } = await req.json();
  const db = await getDb();
  const order = await db.collection("orders").findOne({ orderId });
  if (!order) return new Response("Order not found", { status: 404 });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: order.currency,
            product_data: { name: "Demo Coffee" },
            unit_amount: order.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=1`,
      metadata: { orderId },
    },
    { idempotencyKey: `checkout_${orderId}` }
  );

  await db
    .collection("orders")
    .updateOne(
      { orderId },
      { $set: { "stripe.sessionId": session.id, updatedAt: new Date() } }
    );

  return Response.json({ url: session.url });
}
