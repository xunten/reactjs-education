import React from 'react';
import { App as AntdApp } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/authApi';
import type { Credentials } from '../types/Auth';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: authContextLogin } = useAuth();
  const { message: messageApi } = AntdApp.useApp();

  const handleLogin = async (values: Credentials) => {
    try {
      const { token, user: userData } = await apiLogin(values);
      authContextLogin(token, userData);
      messageApi.success('Đăng nhập thành công');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data?.message || 'Tên đăng nhập hoặc mật khẩu sai.';
      messageApi.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
