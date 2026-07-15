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

    const cartItems = await Cart.find({ userId: user.id }).populate("product");

    // 상품이 삭제되어 참조가 깨진 cart item 분리
    const validItems = cartItems.filter((item) => item.product != null);
    const orphanIds = cartItems
      .filter((item) => item.product == null)
      .map((item) => item._id);

    // DB에 남아있는 고아 cart row 정리 (실패해도 응답에는 영향 없도록 분리)
    if (orphanIds.length > 0) {
      await Cart.deleteMany({ _id: { $in: orphanIds } });
    }

    return NextResponse.json(validItems);
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

    const existingCartItem = await Cart.findOne({
      userId: user.id,
      product: body.product._id,
    });

    // IF PRODUCT ALREADY EXISTS
    if (existingCartItem) {
      existingCartItem.quantity += Number(body.quantity);
      await existingCartItem.save();
      await existingCartItem.populate("product");
      return NextResponse.json(existingCartItem);
    }

    // CREATE NEW CART ITEM
    const cartItem = await Cart.create({
      userId: user.id,
      product: body.product._id,
      quantity: body.quantity,
    });

    await cartItem.populate("product");
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
