import connectMongodb from "@/libs/mongodb";
import UserModel from "@/models/user-model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    await connectMongodb();
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Incorrect password",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY
    );

    return NextResponse.json({
      data: user,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.error({
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
