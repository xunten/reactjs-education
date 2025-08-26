import React from "react";
import { App as AntdApp } from "antd";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../api/authApi";
import type { Credentials, AuthResponse } from "../types/Auth";
import type { User } from "../types/User";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: authContextLogin, logout: authContextLogout } = useAuth();
  const { message: messageApi } = AntdApp.useApp();

  const handleLogin = async (values: { usernameOrEmail: string; password: string }) => {
    try {
      const payload: Credentials = values.usernameOrEmail.includes("@")
        ? { email: values.usernameOrEmail, password: values.password }
        : { username: values.usernameOrEmail, password: values.password };

      const { token, user: authUser }: AuthResponse = await apiLogin(payload);
      console.log('Phản hồi từ API:', authUser);

      const appUser: User = {
        id: authUser.id,
        username: authUser.username,
        full_name: authUser.fullName,
        email: authUser.email,
        roles: authUser.roles.map((role: string, index: number) => ({
          id: index,       // Nếu API không trả id, bạn có thể tạm tạo id
          name: role,
        })),
      };


      authContextLogin(token, appUser); 

      const hasAccess = appUser.roles.some(r => r.name === "admin");

      if (hasAccess) {
        messageApi.success("Đăng nhập thành công");
        navigate("/");
      } else {
        messageApi.error("Bạn không đủ quyền truy cập Dashboard.");
        authContextLogout();
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data?.message ||
        "Tên đăng nhập hoặc mật khẩu sai.";
      messageApi.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Vui lòng đăng nhập để tiếp tục
          </p>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;