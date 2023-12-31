import EditFrom from "@/components/EditFrom";
import axios from "axios";

const getBookById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/books/${id}`, {
      caches: "no-store",
    });
    if (!res.ok) {
      throw new Error("Faild to get book");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditBook({ params }) {
  const { id } = params;
  const { book } = await getBookById(id);
  if (!book) {
    // Atasi ketika buku tidak ditemukan
    return <div>Buku tidak ditemukan</div>;
  }
  const { title, price, description } = book;

  return (
    <div className="">
      <EditFrom id={id} title={title} price={price} description={description} />
    </div>
  );
}
