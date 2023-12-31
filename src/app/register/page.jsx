"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use axios.post directly instead of creating a client
      const response = await axios.post("http://localhost:3000/api/register", {
        username,
        email,
        password,
      });

      if (response.data.token) {
        router.push("/");
      } else {
        setMessage("username or password faild");
      }

      // Redirect to a different page after successful registration
      router.push("/");
    } catch (error) {
      console.error("Registration failed", error.response.data);
    }
  };

  return (
    <div className="mt-32 ">
      <div className="max-w-md mx-auto">
        <form
          // action="/register"
          onSubmit={handleSubmit}
          method="post"
          className="mb-4 bg-white-50 p-10 rounded-lg shadow-xl"
        >
          <h1 className="text-center text-3xl font-bold mb-6">Register</h1>
          <div className="mb-4">
            <label className="block text-gray-600">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
