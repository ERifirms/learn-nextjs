"use client";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookList() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/books");
        setProduct(result.data.books);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <div className="">
      {products.map((item) => (
        <div
          key={item._id}
          className="mx-20 flex p-4 border border-slate-300 my-3 justify-between"
        >
          <div className="">
            <h1 className="font-semibold text-2xl">{item.title}</h1>
            <h3 className="">{item.price}</h3>
            <div className="">{item.description}</div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <RemoveBtn id={item._id} />
            <Link href={`/editBook/${item._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
