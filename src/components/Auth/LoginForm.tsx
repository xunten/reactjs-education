import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
interface LoginFormValues {
  usernameOrEmail: string;
  password: string;
}

interface LoginFormProps {
  onLogin: (values: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  return (
    <Form
      name="login"
      onFinish={onLogin}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="usernameOrEmail"
        label="Tên đăng nhập hoặc email"
        rules={[
          { required: true, message: "Vui lòng nhập tên đăng nhập hoặc email" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="Nhập tên đăng nhập hoặc email"
          autoComplete="username"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
          size="large"
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          className="bg-blue-600 hover:bg-blue-700 border-none"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
