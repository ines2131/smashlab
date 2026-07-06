import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json();

    for (const item of items) {
      const productId = item.product._id;
      const quantity = Number(item.quantity);

      const existing = await Cart.findOne({
        userId: user.id,
        product: productId,
      });

      if (existing) {
        existing.quantity += quantity;
        await existing.save();
      } else {
        await Cart.create({
          userId: user.id,
          product: productId,
          quantity,
        });
      }
    }

    const updatedCart = await Cart.find({
      userId: user.id,
    }).populate("product");

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("cart sync error:", error);

    return NextResponse.json(
      { message: "Failed to sync cart" },
      { status: 500 },
    );
  }
}
