import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);

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
