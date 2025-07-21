import { Link } from "react-router-dom";
import { FaUsers, FaChalkboardTeacher, FaEye } from "react-icons/fa";

interface ClassCardProps {
  id: string;
  name: string;
  code: string;
  students: number;
}

export default function ClassCard({ id, name, code, students }: ClassCardProps) {
  return (
    <div className="border border-green-200 rounded-2xl p-5 bg-gradient-to-tr from-green-50 via-yellow-50 to-white shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-xl text-green-700 flex items-center gap-2">
          <FaChalkboardTeacher className="text-green-600" />
          {name}
        </h2>
        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md font-semibold">
          Mã: {code}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
        <FaUsers className="text-green-500" />
        <span>{students} học sinh</span>
      </div>

      <Link
        to={`/classes/${id}`}
        className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg inline-flex items-center gap-2 transition"
      >
        <FaEye />
        Xem chi tiết
      </Link>
    </div>
  );
}
