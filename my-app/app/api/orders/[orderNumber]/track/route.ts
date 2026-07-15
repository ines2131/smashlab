import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ orderNumber: string }>;
};

export async function POST(request: NextRequest, { params }: Props) {
  try {
    await connectDB();
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthroized" }, { status: 401 });
    }

    const { orderNumber } = await params;

    const order = await Order.findOneAndUpdate(
      {
        orderNumber,
        userId: user.id,
        status: "paid",
        purchasedTracked: { $ne: true },
      },
      { $set: { purchasedTracked: true } },
      { new: true },
    ).populate("items.product");

    if (!order) {
      return NextResponse.json({ tracked: false });
    }

    return NextResponse.json({ tracked: true, order });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to track purchase" },
      { status: 500 },
    );
  }
}
