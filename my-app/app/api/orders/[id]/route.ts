import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectDB();

    const user = await requireUser();

    const { id } = await params;

    const order = await Order.findOne({
      _id: id,
      userId: user.id,
    });

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
    const body = await request.json();
    const { id } = await params;
    const order = await Order.findOneAndUpdate(
      {
        _id: id,
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
