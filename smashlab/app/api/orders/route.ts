import { getDb } from "@/app/lib/mongo";

export async function POST() {
  const db = await getDb();
  const orderId = `ord_${Date.now()}`;
  const doc = {
    orderId,
    amount: 990,
    currency: "hkd",
    status: "pending", // pending | paid | failed | canceled
    customer: { email: "demo@example.com" },
    stripe: { sessionId: null, paymentIntentId: null },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.collection("orders").insertOne(doc);
  return Response.json({ orderId });
}
