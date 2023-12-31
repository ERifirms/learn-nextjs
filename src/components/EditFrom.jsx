"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/libs/authContext";

const EditFrom = ({ id, title, price, description }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newPrice, setNewPrice] = useState(price);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/books/${id}`, {
        newTitle,
        newPrice,
        newDescription,
      });
      if (res.status >= 200 && res.status < 300) {
        setNewTitle(title);
        setNewPrice(price);
        setNewDescription(description);

        router.push("/");
      } else {
        throw new Error("failed to update topic");
      }
    } catch (error) {}
  };
  return (
    <div className="mt-20">
      <div className="h-auto">
        <form
          className="max-w-md mx-auto bg-slate-100 p-10 rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center font-semibold text-xl">add Books</h1>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              price
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setNewPrice(e.target.value)}
              value={newPrice}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Description
            </label>
            <input
              type="text"
              id="text"
              name="email"
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFrom;
