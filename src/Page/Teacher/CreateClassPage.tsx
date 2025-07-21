import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiEdit2, FiKey } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

// Define schema
const schema = yup.object().shape({
  name: yup.string().required("Tên lớp không được bỏ trống"),
  description: yup.string().required("Mô tả không được bỏ trống").max(500, "Mô tả không quá 500 ký tự"),
});

interface FormValues {
  name: string;
  description: string;
}

export default function CreateClassPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const classCode = uuidv4().slice(0, 6).toUpperCase();

  const onSubmit = (data: FormValues) => {
    const newClass = {
      ...data,
      code: classCode,
    };

    console.log("Tạo lớp học:", newClass);
    // TODO: Gọi API tạo lớp học ở đây

    navigate("/classes");
  };

  return (
 
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-green-100">
        {/* Quay lại */}
        <div className="flex items-center gap-2 text-green-700 text-sm">
          <FiArrowLeft className="w-4 h-4" />
          <Link to="/classes" className="hover:underline">
            Quay lại danh sách lớp
          </Link>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <FiBookOpen className="text-green-600" /> Tạo lớp học mới
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Tên lớp */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1 flex items-center gap-1">
              <FiEdit2 /> Tên lớp <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green-300 focus:ring-green-500"
              }`}
              placeholder="Nhập tên lớp học"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1 flex items-center gap-1">
              <FiEdit2 /> Mô tả lớp học
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Ví dụ: Lớp học thêm Toán, Văn..."
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green-300 focus:ring-green-500"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Mã lớp */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1 flex items-center gap-1">
              <FiKey /> Mã lớp học (tự sinh)
            </label>
            <input
              value={classCode}
              readOnly
              className="w-full bg-gray-100 border border-green-200 rounded-lg px-4 py-2 text-gray-600"
            />
          </div>

          {/* Nút submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <FiBookOpen className="text-white" /> Tạo lớp
          </button>
        </form>
      </div>
    </div>
  );
}

