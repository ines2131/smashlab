import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";

import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// UPDATE CART ITEM QUANTITY
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const updatedCartItem = await Cart.findByIdAndUpdate(
      id,
      {
        quantity: Number(body.quantity),
      },
      {
        new: true,
      },
    );

    if (!updatedCartItem) {
      return NextResponse.json(
        {
          message: "Cart item not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update cart item.",
      },
      {
        status: 500,
      },
    );
  }
}

// DELETE CART ITEM
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedCartItem = await Cart.findByIdAndDelete(id);

    if (!deletedCartItem) {
      return NextResponse.json(
        {
          message: "Cart item not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Cart item deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete cart item.",
      },
      {
        status: 500,
      },
    );
  }
}
