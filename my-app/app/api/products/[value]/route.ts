import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findOne(
      mongoose.isValidObjectId(id) ? { _id: id } : { slug: id },
    );

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch product",
      },
      {
        status: 500,
      },
    );
  }
}
