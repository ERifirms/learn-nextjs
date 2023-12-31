// import connectMongodb from "@/libs/mongodb";
// import Book from "@/models/book-model";
import connectMongodb from "@/libs/mongodb";
import Book from "@/models/book-model";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, price, description } = await request.json();
  await connectMongodb();
  await Book.create({ title, price, description });

  return NextResponse.json({ message: "Book Created" }, { status: 201 });
}

export async function GET(req, res) {
  try {
    await connectMongodb();

    const books = await Book.find();
    return NextResponse.json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json("Internal Server Error");
  }
}
