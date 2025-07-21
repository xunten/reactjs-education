import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import ClassCard from "../../components/ClassCard";

const mockClasses = [
  {
    id: "1",
    name: "Toán 10 - Hàm số",
    code: "ABC123",
    students: 15,
  },
  {
    id: "2",
    name: "Vật lý 12 - Sóng cơ",
    code: "XYZ456",
    students: 10,
  },
];

export default function ClassListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Tiêu đề và nút tạo lớp */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-800">📚 Danh sách lớp học</h1>
          <Link
            to="/classes/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <FiPlus className="w-5 h-5" />
            Tạo lớp mới
          </Link>
        </div>

        {/* Danh sách lớp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockClasses.map((cls) => (
            <ClassCard
              key={cls.id}
              id={cls.id}
              name={cls.name}
              code={cls.code}
              students={cls.students}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
