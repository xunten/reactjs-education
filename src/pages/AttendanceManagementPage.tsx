import React, { useState } from 'react';
import { Card, Table, Typography, Button, Space, Tag, Select, DatePicker, Dropdown, Menu } from 'antd';
import {
  PlusOutlined,
  SyncOutlined,
  MoreOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import moment from 'moment'; // For date formatting and comparison

const { Title, Text } = Typography;
const { Option } = Select;

// Define a more comprehensive Attendance type based on the Shadcn example's usage
interface Attendance {
  id: number;
  studentId: number; // Assuming studentId is still relevant
  studentName: string; // Added from Shadcn example
  className: string;
  scheduleTime: string; // Added from Shadcn example (e.g., "8:00 AM - 9:00 AM")
  status: 'Present' | 'Absent' | 'Late' | string; // Changed to match Shadcn example's status names
  marked_at: Date; // Changed from 'date' to 'marked_at' to match Shadcn example
}

// Mock data based on the Shadcn example's structure
const initialAttendanceData: Attendance[] = [
  { id: 1, studentId: 101, studentName: 'Nguyễn Văn A', className: 'Math 101', scheduleTime: '08:00 AM - 09:30 AM', status: 'Present', marked_at: new Date('2025-08-07T08:05:00Z') },
  { id: 2, studentId: 102, studentName: 'Trần Thị B', className: 'Math 101', scheduleTime: '08:00 AM - 09:30 AM', status: 'Absent', marked_at: new Date('2025-08-07T08:10:00Z') },
  { id: 3, studentId: 103, studentName: 'Lê Văn C', className: 'Lớp 12A1', scheduleTime: '10:00 AM - 11:30 AM', status: 'Late', marked_at: new Date('2025-08-07T10:15:00Z') },
  { id: 4, studentId: 104, studentName: 'Phạm Thị D', className: 'Math 101', scheduleTime: '08:00 AM - 09:30 AM', status: 'Present', marked_at: new Date('2025-08-06T08:02:00Z') },
  { id: 5, studentId: 105, studentName: 'Hoàng Văn E', className: 'Lớp 12A1', scheduleTime: '10:00 AM - 11:30 AM', status: 'Absent', marked_at: new Date('2025-08-06T10:00:00Z') },
];

const getStatusTag = (status: string) => {
  switch (status) {
    case 'Present':
      return <Tag color="green">Có mặt</Tag>;
    case 'Absent':
      return <Tag color="red">Vắng</Tag>;
    case 'Late':
      return <Tag color="gold">Đi muộn</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const AttendanceManagementPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  const filteredData = initialAttendanceData.filter((item) => {
    const matchesClass = !selectedClass || item.className === selectedClass;
    const matchesDate = !selectedDate || moment(item.marked_at).isSame(selectedDate, 'day');
    return matchesClass && matchesDate;
  });

  const handleRefresh = () => {
    setSelectedClass(undefined);
    setSelectedDate(null);
    console.log('Refreshing attendance data...');
  };

  const columns = [
    { title: 'Tên Học sinh', dataIndex: 'studentName', key: 'studentName' },
    { title: 'Lớp học', dataIndex: 'className', key: 'className' },
    { title: 'Thời gian biểu', dataIndex: 'scheduleTime', key: 'scheduleTime', className: 'hidden md:table-cell' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'Ngày điểm danh',
      dataIndex: 'marked_at',
      key: 'marked_at',
      className: 'hidden md:table-cell',
      render: (date: Date) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: <span className="sr-only">Hành động</span>, // sr-only for accessibility
      key: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />}>Chỉnh sửa trạng thái</Menu.Item>
              <Menu.Item key="view" icon={<EyeOutlined />}>Xem chi tiết</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Quản lý Điểm danh</Title>
        <Button type="default" icon={<PlusOutlined />}>
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Điểm danh mới</span>
        </Button>
      </div>

      {/* Main Card */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>Điểm danh</Title>
            <Text type="secondary">Xem và quản lý hồ sơ điểm danh của học sinh.</Text>
          </div>
          <Button type="default" icon={<SyncOutlined />} onClick={handleRefresh}>
            Làm mới
          </Button>
        </div>

        {/* Filters */}
        <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
          <Select
            placeholder="Tất cả lớp"
            style={{ width: 180 }}
            value={selectedClass}
            onChange={(value) => setSelectedClass(value)}
          >
            <Option value={undefined}>Tất cả lớp</Option>
            <Option value="Math 101">Math 101</Option>
            <Option value="Lớp 12A1">Lớp 12A1</Option>
          </Select>
          <DatePicker
            placeholder="Chọn ngày"
            style={{ width: 180 }}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderExtraFooter={() => (
              <Button type="link" onClick={() => setSelectedDate(moment())}>
                Hôm nay
              </Button>
            )}
          />
          {/* You can add a filter button here if needed after selecting class/date */}
          {/* <Button type="default" icon={<FilterOutlined />}>Lọc</Button> */}
        </Space>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 7 }}
        />
      </Card>
    </div>
  );
};

export default AttendanceManagementPage;