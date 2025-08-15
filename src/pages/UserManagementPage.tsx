import React, { useCallback, useMemo } from "react";
import {
  Card,
  Table,
  Typography,
  Button,
  Space,
  Tag,
  Dropdown,
  Row,
  Col,
  Spin,
  Alert
} from "antd";
import {
  MoreOutlined,
  PlusOutlined,
  UserOutlined,
  TeamOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { User } from "../types";
import { useUsers, useDeleteUser } from "../hooks/useUsers";

const { Title, Text } = Typography;

const UserManagementPage: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const deleteMutation = useDeleteUser();

  // Xử lý click menu
  const handleMenuClick = useCallback(
    (key: string, record: User) => {
      if (key === "edit") {
        console.log(`Chỉnh sửa user ID: ${record.id}`);
        // TODO: mở modal chỉnh sửa
      }
      if (key === "delete") {
        deleteMutation.mutate(record.id);
      }
    },
    [deleteMutation]
  );

  // Tạo menu cho từng hàng
  const getMenuItems = useCallback(
    (record: User) => [
      {
        key: "edit",
        label: "Chỉnh sửa",
        onClick: () => handleMenuClick("edit", record)
      },
      {
        key: "delete",
        label: "Xóa",
        danger: true,
        onClick: () => handleMenuClick("delete", record)
      }
    ],
    [handleMenuClick]
  );

  const columns: ColumnsType<User> = useMemo(
    () => [
      {
        title: "",
        dataIndex: "avatar",
        key: "avatar",
        render: () => (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#f0f0f0"
            }}
          />
        )
      },
      {
        title: "Họ tên",
        dataIndex: "fullName",
        key: "fullName",
        render: (text: string, record: User) => text || record.username
      },
      { title: "Email", dataIndex: "email", key: "email" },
      {
        title: "Vai trò",
        dataIndex: "roles",
        key: "roles",
        render: (roles: string[]) => (
          <Space wrap>
            {roles.map((role) => (
              <Tag
                key={role}
                color={
                  role === "teacher"
                    ? "blue"
                    : role === "admin"
                      ? "red"
                      : "green"
                }
              >
                {role}
              </Tag>
            ))}
          </Space>
        )
      },
      { title: "Username", dataIndex: "username", key: "username" },
      {
        title: "",
        key: "actions",
        render: (_, record) => (
          <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        )
      }
    ],
    [getMenuItems]
  );

  const totalUsers = users?.length || 0;
  const totalTeachers =
    users?.filter((u) => u.roles.includes("teacher")).length || 0;

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin tip="Đang tải dữ liệu..." fullscreen />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi tải dữ liệu"
        description={(error as Error).message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {/* KPI Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Space align="center">
              <UserOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <div>
                <Text type="secondary">Tổng số người dùng</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {totalUsers}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Space align="center">
              <TeamOutlined style={{ fontSize: 32, color: "#faad14" }} />
              <div>
                <Text type="secondary">Tổng số Giáo viên</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {totalTeachers}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Bảng danh sách */}
      <Card
        title={
          <div>
            <div style={{ fontWeight: "bold" }}>Danh sách Người dùng</div>
            <div style={{ fontSize: 12, color: "gray" }}>
              Quản lý người dùng (học sinh, giáo viên, admin)
            </div>
          </div>
        }
        extra={
          <Button type="default" icon={<PlusOutlined />}>
            Thêm Người dùng
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 7 }}
        />
      </Card>
    </div>
  );
};

export default UserManagementPage;
