import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải từ 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  role: yup.string().required("Vui lòng chọn vai trò"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("Dữ liệu đăng nhập:", data);
    // Xử lý đăng nhập ở đây
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img
              src="/images/logo.png"
              alt="logo"
              className="inline-block w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-bold">Đăng nhập</h2>
          <p className="text-gray-500 text-base">
            Đăng nhập vào hệ thống quản lý học tập
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-medium block mb-1">Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              {...register("email")}
              className="w-full px-4 py-2 border border-blue-200 rounded-md text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                {...register("password")}
                className="w-full px-4 py-2 border border-blue-200 rounded-md text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1">Vai trò</label>
            <select
              {...register("role")}
              className="w-full px-4 py-2 border  border-blue-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Chọn vai trò của bạn</option>
              <option value="student">Học sinh</option>
              <option value="teacher">Giáo viên</option>
              <option value="admin">Quản trị viên</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-600 underline">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}