import connectMongodb from "@/libs/mongodb";
import Book from "@/models/book-model";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newPrice: price,
    newDescription: description,
  } = await req.json();
  await connectMongodb();
  await Book.findByIdAndUpdate(id, { title, price, description });
  return NextResponse.json({ message: "Book updated" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  connectMongodb();
  const book = await Book.findById(id);
  return NextResponse.json({ book });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  connectMongodb();
  await Book.findByIdAndDelete(id);
  return NextResponse.json({ message: "Book Deleted " }, { status: 200 });
}
