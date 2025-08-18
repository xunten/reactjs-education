import React, { useState } from 'react';
import { Card, Table, Typography, Button, Space, Tag, Select, DatePicker, Dropdown, Menu, message } from 'antd';
import { SyncOutlined, MoreOutlined, EditOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useAttendances } from '../hooks/useAttendances';
import type { Attendance } from '../types/Attendance';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const { Title, Text } = Typography;
const { Option } = Select;

const getStatusTag = (status: Attendance['status']) => {
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
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  const { data: attendances, isLoading, isError, refetch } = useAttendances();

  if (isError) message.error('Lỗi khi lấy dữ liệu điểm danh');

  // Lọc dữ liệu theo class + date
  const filteredData: Attendance[] =
    attendances?.filter(item => {
      const matchesClass = !selectedClass || item.className === selectedClass;
      const matchesDate = !selectedDate || moment.utc(item.markedAt).isSame(selectedDate, 'day');
      return matchesClass && matchesDate;
    }) ?? [];

  // Làm mới
  const handleRefresh = () => {
    setSelectedClass(undefined);
    setSelectedDate(null);
    refetch();
  };

  // Xuất Excel
  const handleExport = () => {
    if (filteredData.length === 0) {
      message.warning('Không có dữ liệu để xuất.');
      return;
    }

    const formattedData = filteredData.map(item => ({
      'Tên Học sinh': item.studentName ?? item.fullName,
      'Lớp học': item.className,
      'Trạng thái': item.status,
      'Ngày điểm danh': moment.utc(item.markedAt).format('DD/MM/YYYY HH:mm'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'bao-cao-diem-danh.xlsx');
  };

  const columns = [
    { title: 'Tên Học sinh', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Lớp học', dataIndex: 'className', key: 'className' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: Attendance['status']) => getStatusTag(status),
    },
    {
      title: 'Ngày điểm danh',
      dataIndex: 'markedAt',
      key: 'markedAt',
      render: (date: string) => moment.utc(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />}>
                Chỉnh sửa trạng thái
              </Menu.Item>
              <Menu.Item key="view" icon={<EyeOutlined />}>
                Xem chi tiết
              </Menu.Item>
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Quản lý Điểm danh
        </Title>
      </div>

      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Điểm danh
            </Title>
            <Text type="secondary">Xem và quản lý hồ sơ điểm danh của học sinh.</Text>
          </div>
          <Space>
            <Button type="default" icon={<SyncOutlined />} onClick={handleRefresh}>
              Làm mới
            </Button>
            <Button type="default" icon={<DownloadOutlined />} onClick={handleExport}>
              Xuất Excel
            </Button>
          </Space>
        </div>

        {/* Bộ lọc */}
        <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
          <Select
            placeholder="Tất cả lớp"
            style={{ width: 180 }}
            value={selectedClass}
            onChange={setSelectedClass}
            allowClear
          >
            {attendances
              ?.map(a => a.className)
              .filter((v, i, arr) => v && arr.indexOf(v) === i)
              .map(c => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
          </Select>

          <DatePicker
            placeholder="Chọn ngày"
            style={{ width: 180 }}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </Space>

        {/* Bảng */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 7 }}
        />
      </Card>
    </div>
  );
};

export default AttendanceManagementPage;
