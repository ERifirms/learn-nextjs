import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const RemoveBook = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/books/${id}`);
      if (res.ok) {
        router.reload();
      }
    } catch (error) {
      console.error("Error removing book:", error);
    }
    // }
  };

  return (
    <button onClick={RemoveBook} className="text-red-600">
      <HiOutlineTrash size={24} />
    </button>
  );
}
