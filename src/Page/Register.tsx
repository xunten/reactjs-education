import { useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"

type FormData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role: string
  studentId?: string
  phone: string
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>()

  const role = watch("role")

  const onSubmit = (data: FormData) => {
    console.log("Registration data:", data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img
              src="/images/logo.png"
              alt="logo"
              className="inline-block w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-bold">Đăng ký</h2>
          <p className="text-gray-700">Tạo tài khoản mới để sử dụng hệ thống</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="font-medium">Họ và tên</label>
            <input
              id="fullName"
              type="text"
              placeholder="Nhập họ và tên"
              {...register("fullName", { required: "Vui lòng nhập họ và tên" })}
              className="w-full px-4 py-2 border border-blue-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              {...register("email", { required: "Vui lòng nhập email" })}
              className="w-full px-4 py-2 border border-blue-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="font-medium">Vai trò</label>
            <select
              id="role"
              {...register("role", { required: "Vui lòng chọn vai trò" })}
              className="w-full px-4 py-2 border border-blue-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={role || ""}
              onChange={e => setValue("role", e.target.value)}
            >
              <option value="">Chọn vai trò của bạn</option>
              <option value="student">Học sinh</option>
              <option value="teacher">Giáo viên</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {role === "student" && (
            <div className="space-y-2">
              <label htmlFor="studentId" className="font-medium">Mã số học sinh</label>
              <input
                id="studentId"
                type="text"
                placeholder="Nhập mã số học sinh"
                {...register("studentId", { required: "Vui lòng nhập mã số học sinh" })}
                className="w-full px-4 py-2 border border-blue-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId.message}</p>}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="password" className="font-medium">Mật khẩu</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                className="w-full px-4 py-2 border border-blue-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="font-medium">Xác nhận mật khẩu</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                {...register("confirmPassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: value =>
                    value === watch("password") || "Mật khẩu xác nhận không khớp"
                })}
                className="w-full px-4 py-2 border border-blue-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Đăng ký
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Đăng nhập ngay
            </a>
          </p>
     </div>
      </div>
    </div>
  )
}