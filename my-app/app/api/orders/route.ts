import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import { generateOrderNumber } from "@/util/generateOrderNumber";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = await requireUser();

    const body = await request.json();

    const cartItems = await Cart.find({ userId: user.id }).populate("product");

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      userId: user.id,

      customer: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        email: body.email,
      },

      items: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),

      totalAmount,

      paymentMethod: body.paymentMethod,

      status: "pending",
    });

    await Cart.deleteMany({
      userId: user.id,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error, "체크아웃에러");

    return NextResponse.json(
      { message: "Failed to create order." },
      { status: 500 },
    );
  }
}
