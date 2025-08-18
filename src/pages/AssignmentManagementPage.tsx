/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Card,
  Table,
  Typography,
  Button,
  Dropdown,
  Row,
  Col,
  Input,
  Space,
  Spin,
  Alert,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useAssignments } from "../hooks/useAssignments";
import { useClasses } from "../hooks/useClasses";
import type { Assignment } from "../types/Assignment";

const { Title, Text } = Typography;
const { Search } = Input;

const AssignmentManagementPage: React.FC = () => {
  const { assignments, isLoading, error, deleteAssignment } = useAssignments();
  const { classes = [] } = useClasses();

  // Tính stats
  const totalAssignments = assignments.length;
  const upcomingAssignments = assignments.filter(a =>
    dayjs(a.dueDate).isAfter(dayjs())
  ).length;

  // Lấy tên lớp từ classId
  const getClassName = (classId: number) => {
    const cls = classes.find(c => c.id === classId);
    return cls ? cls.className : "Không rõ";
  };

  // Menu hành động
  const handleMenuClick = (key: string, record: Assignment) => {
    if (key === "edit") {
      console.log("Edit", record);
    } else if (key === "delete") {
      deleteAssignment(record.id);
    } else if (key === "submissions") {
      console.log("View Submissions", record);
    } else if (key === "comments") {
      console.log("View Comments", record);
    }
  };

  const menuItems = [
    { key: "edit", label: "Chỉnh sửa" },
    { key: "delete", label: "Xóa" },
    { key: "submissions", label: "Xem Bài Nộp" },
    { key: "comments", label: "Xem Bình Luận" },
  ];


  const columns = [
    { title: "Tên Bài Tập", dataIndex: "title", key: "title" },
    {
      title: "Lớp",
      key: "className",
      render: (_: any, record: Assignment) => getClassName(record.classId),
    },
    {
      title: "Hạn Nộp",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    { title: "Điểm Tối Đa", dataIndex: "maxScore", key: "maxScore" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Assignment) => (
        <Dropdown
          menu={{ items: menuItems, onClick: ({ key }) => handleMenuClick(key, record) }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>

      ),
    },
  ];

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" tip="Đang tải danh sách bài tập..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Lỗi tải dữ liệu"
          description={`Không thể tải danh sách bài tập: ${(error as Error).message}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="assignment-page" style={{ padding: 24 }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Quản lý Bài tập
        </Title>
        <Button type="default" icon={<PlusOutlined />}>
          Thêm Bài tập
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
        title={<Text strong>Danh sách Bài tập</Text>}
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
