import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const slug = searchParams.get("slug");
    if (category && slug) {
      const product = await Product.findOne({
        category,
        slug,
      });

      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(product);
    }

    if (category) {
      const products = await Product.find({
        category,
      });

      return NextResponse.json(products);
    }

    const products = await Product.find().lean();
    console.log(products, "products");
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
