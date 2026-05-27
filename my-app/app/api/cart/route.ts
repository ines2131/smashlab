import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const cartItem = await Cart.create({
      productId: body.id,
      name: body.name,
      price: body.price,
      image: body.image,
      quantity: Number(body.quantity),
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to add cart Item.",
      },
      {
        status: 500,
      },
    );
  }
}
