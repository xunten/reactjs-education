import React, { useState } from "react";
import {
  Card,
  Table,
  Typography,
  Button,
  Dropdown,
  Menu,
  Row,
  Col,
  Input,
  Space,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Assignment } from "../types";

const { Title, Text } = Typography;
const { Search } = Input;

const initialAssignments: Assignment[] = [
  {
    id: 13,
    title: "Bài Tập Tuần 2",
    classId: 1,
    dueDate: new Date("2025-08-08"),
    maxScore: 15.0,
  },
  {
    id: 17,
    title: "Bài tập Java",
    classId: 2,
    dueDate: new Date("2025-08-08"),
    maxScore: 10.0,
  },
  {
    id: 18,
    title: "Bài tập C#",
    classId: 2,
    dueDate: new Date("2025-08-10"),
    maxScore: 12.0,
  },
];

const AssignmentManagementPage: React.FC = () => {
  const [assignments] = useState<Assignment[]>(initialAssignments);

  const totalAssignments = assignments.length;
  const upcomingAssignments = assignments.filter(
    (a) => a.dueDate.getTime() > new Date().getTime()
  ).length;

  const handleMenuClick = (key: string, record: Assignment) => {
    if (key === "edit") {
      console.log("Edit", record);
    } else if (key === "delete") {
      console.log("Delete", record);
    } else if (key === "submissions") {
      console.log("View Submissions", record);
    } else if (key === "comments") {
      console.log("View Comments", record);
    }
  };

  const menu = (record: Assignment) => (
    <Menu
      onClick={({ key }) => handleMenuClick(key as string, record)}
      items={[
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete" },
        { key: "submissions", label: "View Submissions" },
        { key: "comments", label: "View Comments" },
      ]}
    />
  );

  const columns: ColumnsType<Assignment> = [
    { title: "Tên Bài Tập", dataIndex: "title", key: "title" },
    { title: "Lớp", dataIndex: "classId", key: "classId" },
    {
      title: "Hạn Nộp",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    { title: "Điểm Tối Đa", dataIndex: "maxScore", key: "maxScore" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="assignment-page" style={{ padding: 24 }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Assignment Management
        </Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Assignment
        </Button>
      </div>

      {/* Stats */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Space>
              <FileTextOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <div>
                <Text type="secondary">Tổng số bài tập</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {totalAssignments}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Space>
              <ClockCircleOutlined style={{ fontSize: 32, color: "#faad14" }} />
              <div>
                <Text type="secondary">Sắp đến hạn</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {upcomingAssignments}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card
        title={<Text strong>Assignments</Text>}
        extra={<Search placeholder="Tìm kiếm..." style={{ width: 250 }} />}
      >
        <Table
          columns={columns}
          dataSource={assignments}
          rowKey="id"
          pagination={{ pageSize: 7 }}
        />
      </Card>
    </div>
  );
};

export default AssignmentManagementPage;
