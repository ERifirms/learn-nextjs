import connectMongodb from "@/libs/mongodb";
import UserModel from "@/models/user-model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { username, email, password } = await req.json();

  try {
    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongodb();
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY
    );

    return NextResponse.json({
      data: user,
      token: token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

export async function GET(req) {
  await connectMongodb();
  const users = await UserModel.find();
  return NextResponse.json({ users });
}
