import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    console.log("URI:", process.env.MONGODB_URI);
    console.log("DB:", mongoose.connection.name);

    const count = await Product.countDocuments();

    console.log("COUNT:", count);

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
