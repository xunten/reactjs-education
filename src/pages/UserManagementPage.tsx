/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from "react";
import {
  Card,
  Table,
  Typography,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Spin,
  Alert,
  Tabs,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  UserOutlined,
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { User } from "../types/User";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "../hooks/useUsers";

const { Title, Text } = Typography;

const allRoles = [
  { id: 1, name: "student" },
  { id: 2, name: "teacher" },
  { id: 3, name: "admin" },
];

const availableRolesOptions = allRoles.map((role) => ({
  label: role.name,
  value: role.name,
}));

const UserManagementTabs: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [form] = Form.useForm();

  const openModal = useCallback(
    (user?: User) => {
      setEditingUser(user || null);
      setModalVisible(true);

      if (user) {
        // Xử lý roles để hiển thị checkbox
        const roleNames = user.roles?.map((r) => r.name) || [];
        form.setFieldsValue({
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          roles: roleNames,
          password: "",
        });
      } else {
        form.resetFields();
      }
    },
    [form]
  );

  const closeModal = () => setModalVisible(false);

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();

      // Convert roles từ name sang ID
      const rolesWithIds = allRoles
        .filter((role) => values.roles.includes(role.name))
        .map((role) => role.id);

      const payload: any = {
        username: values.username,
        full_name: values.full_name,
        email: values.email,
        roles: rolesWithIds,
      };

      // Thêm password khi tạo mới hoặc đổi password
      if (!editingUser || values.password) {
        if (!values.password) {
          message.error("Password is required");
          return;
        }
        payload.password = values.password;
      }

      if (editingUser && editingUser.id) {
        await updateMutation.mutateAsync({ userId: editingUser.id, userData: payload });
        message.success("User updated successfully");
      } else {
        await createMutation.mutateAsync(payload);
        message.success("User created successfully");
      }

      closeModal();
      refetch();
    } catch (err) {
      console.error("Error submitting user:", err);
      message.error(editingUser ? "Failed to update user" : "Failed to create user");
    }
  }, [form, editingUser, updateMutation, createMutation, refetch]);

  const handleDeleteUser = useCallback(
    (userId: number) => {
      if (!userId) return;
      deleteMutation.mutate(userId, {
        onSuccess: () => {
          message.success("User deleted successfully");
          refetch();
        },
        onError: (err: any) => {
          if (err?.response?.data?.errors?.[0]?.includes("foreign key")) {
            message.error("Cannot delete user: still linked to a class");
          } else {
            message.error(err.message || "Failed to delete user");
          }
          console.error("Delete error:", err);
        },
      });
    },
    [deleteMutation, refetch]
  );

  const getRoleDisplay = (roles: any[]) => {
    if (!Array.isArray(roles)) return [];
    return roles
      .map((role) => {
        if (typeof role === "object" && role.name) return role;
        if (typeof role === "number") {
          const r = allRoles.find((roleObj) => roleObj.id === role);
          return r ? { id: role, name: r.name } : null;
        }
        return null;
      })
      .filter(Boolean);
  };

  const columns: ColumnsType<User> = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id", width: 80 },
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
        render: (text: string, record: User) => text || record.username,
      },
      { title: "Email", dataIndex: "email", key: "email" },
      {
        title: "Roles",
        dataIndex: "roles",
        key: "roles",
        render: (roles: any[]) => {
          const displayRoles = getRoleDisplay(roles);
          return (
            <Space wrap>
              {displayRoles.map((r: any) => (
                <Tag
                  key={r.id}
                  color={r.name === "teacher" ? "blue" : r.name === "admin" ? "red" : "green"}
                >
                  {r.name}
                </Tag>
              ))}
            </Space>
          );
        },
      },
      { title: "Username", dataIndex: "username", key: "username" },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button type="text" icon={<EditOutlined />} onClick={() => openModal(record)} />
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeleteUser(record.id)}
              okText="Yes"
              cancelText="No"
              okType="danger"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
        width: 120,
      },
    ],
    [handleDeleteUser, openModal]
  );

  const totalUsers = users?.length || 0;
  const totalTeachers =
    users?.filter((u) => u.roles?.some((r: any) => (typeof r === "object" ? r.name === "teacher" : r === 2))).length ||
    0;
  const totalStudents =
    users?.filter((u) => u.roles?.some((r: any) => (typeof r === "object" ? r.name === "student" : r === 3))).length ||
    0;

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
        <Spin size="large" tip="Loading data..." />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error loading data" description={(error as Error).message} type="error" showIcon />;
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Space align="center">
              <UserOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <div>
                <Text type="secondary">Total Users</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {totalUsers}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Space align="center">
              <TeamOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <div>
                <Text type="secondary">Total Teachers</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {totalTeachers}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Space align="center">
              <TeamOutlined style={{ fontSize: 32, color: "#52c41a" }} />
              <div>
                <Text type="secondary">Total Students</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {totalStudents}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="table"
        items={[
          {
            key: "table",
            label: "User Management Table",
            children: (
              <Card
                title={
                  <div>
                    <div style={{ fontWeight: "bold" }}>User List</div>
                    <div style={{ fontSize: 12, color: "gray" }}>Manage all users in the system</div>
                  </div>
                }
                extra={
                  <Button type="default" icon={<PlusOutlined />} onClick={() => openModal()}>
                    Add User
                  </Button>
                }
              >
                <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 7 }} />
              </Card>
            ),
          },
        ]}
      />

      <Modal
        visible={modalVisible}
        title={editingUser ? "Edit User" : "Add User"}
        onCancel={closeModal}
        onOk={handleSubmit}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="full_name"
            label="Full Name"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "This field is required" },
              { type: "email", message: "Invalid email address" },
            ]}
          >
            <Input />
          </Form.Item>
 <Form.Item
  name="password"
  label="Password"
  rules={
    editingUser
      ? []
      : [
          { required: true, message: "Password is required" },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
          },
        ]
  }
>
  <Input.Password placeholder={editingUser ? "Leave empty to keep current password" : ""} />
</Form.Item>

          <Form.Item
            name="roles"
            label="Roles"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Checkbox.Group options={availableRolesOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagementTabs;
