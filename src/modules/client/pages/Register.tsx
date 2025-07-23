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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const role = watch("role")

  const onSubmit = (data: FormData) => {
    console.log("Registration data:", data)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img
              src="/images/logo.png"
              alt="logo"
              className="inline-block w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-bold">Register</h2>
          <p className="text-gray-700">Create a new account to use the system</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="font-medium">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Please enter your full name" })}
              className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Please enter your email" })}
              className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="font-medium">Role</label>
            <select
              id="role"
              {...register("role", { required: "Please select your role" })}
              className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-green-500"
              value={role || ""}
              onChange={e => setValue("role", e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {role === "student" && (
            <div className="space-y-2">
              <label htmlFor="studentId" className="font-medium">Student ID</label>
              <input
                id="studentId"
                type="text"
                placeholder="Enter your student ID"
                {...register("studentId", { required: "Please enter your student ID" })}
                className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId.message}</p>}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="font-medium">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Please enter your password" })}
                className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-green-500"
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
            <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border border-green-200 rounded-md bg-gray-100 text-base focus:outline-none focus:ring-1 focus:ring-green-500"
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

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md font-semibold text-lg hover:bg-green-700 transition-colors cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login now
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
