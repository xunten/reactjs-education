import React, { } from "react";
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
  Spin, 
  Alert,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from 'dayjs'; 
import { useAssignments } from "../hooks/useAssignments";
import type { Assignment } from '../types/Assignment';

const { Title, Text } = Typography;
const { Search } = Input;

const AssignmentManagementPage: React.FC = () => {
  const { data: assignments, isLoading, error } = useAssignments(); // Sử dụng hook useAssignments

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Đang tải danh sách bài tập..." />
      </div>
    );
  }

  // Xử lý trạng thái lỗi
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

  // Tính toán lại stats sau khi có dữ liệu từ API
  const totalAssignments = assignments ? assignments.length : 0;
  const upcomingAssignments = assignments
    ? assignments.filter((a: { dueDate: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(a.dueDate).isAfter(dayjs())).length // Sử dụng dayjs để so sánh ngày
    : 0;

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
        { key: "edit", label: "Chỉnh sửa" },
        { key: "delete", label: "Xóa" },
        { key: "submissions", label: "Xem Bài Nộp" },
        { key: "comments", label: "Xem Bình Luận" },
      ]}
    />
  );

  const columns: ColumnsType<Assignment> = [
    { title: "Tên Bài Tập", dataIndex: "title", key: "title" },
    { 
      title: "Lớp", 
      dataIndex: "className", // Đổi từ classId sang className để hiển thị tên lớp
      key: "className" 
    },
    {
      title: "Hạn Nộp",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'), // Sử dụng dayjs để định dạng chuỗi ngày tháng
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
          alignItems: "center", // Căn giữa theo chiều dọc
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
          dataSource={assignments || []} // Đảm bảo dataSource là mảng rỗng nếu chưa có dữ liệu
          rowKey="id"
          pagination={{ pageSize: 7 }}
        />
      </Card>
    </div>
  );
};

export default AssignmentManagementPage;
