import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await Cart.find({ userId: user.id }).populate(
      "productId",
    );

    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch cart items." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = await requireUser();
    const body = await request.json();

    console.log(user, "userid");

    const existingCartItem = await Cart.findOne({
      userId: user.id,
      productId: body.productId,
    });

    // IF PRODUCT ALREADY EXISTS
    if (existingCartItem) {
      existingCartItem.quantity += Number(body.quantity);
      await existingCartItem.save();
      return NextResponse.json(existingCartItem);
    }

    // CREATE NEW CART ITEM
    const cartItem = await Cart.create({
      userId: user.id,
      productId: body.productId,
      quantity: body.quantity,
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("post", error);
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
