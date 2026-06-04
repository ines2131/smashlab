import { connectDB } from "@/lib/mongodb";
import { SessionData, sessionOptions } from "@/lib/session";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ message: "Wrong password" }, { status: 401 });
  }

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  session.user = {
    id: user._id.toString(),
    email: user.email,
  };

  const userId = session.user.id;

  console.log(userId);

  await session.save();

  return NextResponse.json({
    message: "Login success",
  });
}
