"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description) {
      alert("Title, price, and Description are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/books", {
        title,
        price,
        description,
      });

      if (response.status >= 200 && response.status < 300) {
        setTitle("");
        setPrice("");
        setDescription("");

        router.push("/");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-100 p-10 rounded-md shadow-md"
      >
        <h1 className="text-center font-semibold text-xl mb-6">Add Books</h1>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-600">
            Price
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
