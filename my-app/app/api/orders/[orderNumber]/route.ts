import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ orderNumber: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectDB();

    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderNumber } = await params;

    const order = await Order.findOne({
      orderNumber,
      userId: user.id,
    }).populate("items.product");

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch order" },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    await connectDB();
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orderNumber } = await params;
    const order = await Order.findOneAndUpdate(
      {
        orderNumber,
        userId: user.id,
      },
      {
        status: body.status,
      },
      {
        new: true,
      },
    );
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update order",
      },
      {
        status: 500,
      },
    );
  }
}
