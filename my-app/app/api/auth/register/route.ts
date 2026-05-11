import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { registerSchema } from "@/validations/auth.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error:
            validated.error.flatten().fieldErrors.email?.[0] ||
            validated.error.flatten().fieldErrors.password?.[0] ||
            "Invalid form data",
        },
        {
          status: 400,
        },
      );
    }

    const { name, email, password } = validated.data;

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User registered",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
