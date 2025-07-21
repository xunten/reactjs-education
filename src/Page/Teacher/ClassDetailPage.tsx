import { useParams } from "react-router-dom";
import { FiUsers, FiEdit2, FiInfo, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ClassDetailPage() {
  const { id } = useParams();

  // TODO: gọi API để lấy dữ liệu lớp học theo ID
  const classData = {
    id,
    name: "Lớp Toán 12A1",
    description: "Lớp học thêm buổi tối ôn thi đại học môn Toán.",
    teacher: "Thầy Nguyễn Văn A",
    studentsCount: 35,
    createdAt: "2025-07-10",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        {/* Quay lại */}
        <div className="flex items-center gap-2 text-green-700 text-sm mb-4">
          <FiArrowLeft className="w-4 h-4" />
          <Link to="/classes" className="hover:underline">
            Quay lại danh sách lớp
          </Link>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-green-800 mb-2 flex items-center gap-2">
          <FiInfo className="text-green-600" />
          Thông tin lớp học
        </h1>

        {/* Nội dung */}
        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-medium text-green-700">Tên lớp:</span> {classData.name}
          </div>
          <div>
            <span className="font-medium text-green-700">Mô tả:</span> {classData.description}
          </div>
          <div>
            <span className="font-medium text-green-700">Giáo viên:</span> {classData.teacher}
          </div>
          <div className="flex items-center gap-2">
            <FiUsers className="text-green-600" />
            <span>{classData.studentsCount} học sinh</span>
          </div>
          <div>
            <span className="font-medium text-green-700">Ngày tạo:</span>{" "}
            {new Date(classData.createdAt).toLocaleDateString("vi-VN")}
          </div>
        </div>

        {/* Action */}
        <div className="mt-6">
          <Link
            to={`/classes/update/${classData.id}`}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <FiEdit2 />
            Cập nhật lớp học
          </Link>
        </div>
      </div>
    </div>
  );
}
