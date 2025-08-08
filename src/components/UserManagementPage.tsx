import React, { useState } from "react";
import { Card, Table, Typography, Button, Space, Tag, Dropdown, Menu, Row, Col } from "antd";
import { MoreOutlined, PlusOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import type { User } from "../types";

const { Title, Text } = Typography;

const initialUsers: User[] = [
  { id: 1, username: "teacher1", fullName: "Teacher Alice", email: "alice@edu.com", roles: ["teacher"] },
  { id: 2, username: "teacher2", fullName: "Teacher Bob", email: "bob@edu.com", roles: ["teacher"] },
  { id: 3, username: "student1", fullName: "Student John", email: "john@edu.com", roles: ["student"] },
  { id: 4, username: "student2", fullName: "Student Mary", email: "mary@edu.com", roles: ["student"] },
  { id: 5, username: "student3", fullName: "Student Mike", email: "mike@edu.com", roles: ["student"] },
];

const UserManagementPage: React.FC = () => {
  const [users] = useState<User[]>(initialUsers);

  const totalUsers = users.length;
  const totalTeachers = users.filter((u) => u.roles.includes("teacher")).length;

  const columns = [
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
            backgroundColor: "#f0f0f0",
          }}
        />
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string, record: User) => text || record.username,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => (
        <Space wrap>
          {roles.map((role) => (
            <Tag key={role} color={role === "teacher" ? "blue" : role === "admin" ? "red" : "green"}>
              {role}
            </Tag>
          ))}
        </Space>
      ),
    },
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "",
      key: "actions",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
              <Menu.Item key="delete">Xóa</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Phần thống kê */}
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

      {/* Card chứa bảng */}
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
