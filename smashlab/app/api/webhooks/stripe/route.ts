import Stripe from "stripe";
import { NextRequest } from "next/server";
import { getDb } from "@/app/lib/mongo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  const rawBody = await req.text(); // App Router: keep the raw body

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

  const db = await getDb();

  // Idempotency – skip if already processed
  const exists = await db
    .collection("webhook_events")
    .findOne({ eventId: event.id });
  if (!exists) {
    await db.collection("webhook_events").insertOne({
      eventId: event.id,
      type: event.type,
      receivedAt: new Date(),
      raw: JSON.parse(rawBody),
    });
  } else {
    return new Response("ok");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (orderId) {
      await db.collection("orders").updateOne(
        { orderId },
        {
          $set: {
            status: "paid",
            "stripe.paymentIntentId": paymentIntentId ?? null,
            updatedAt: new Date(),
          },
        }
      );
    }
  }

  return new Response("ok");
}
