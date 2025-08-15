import React from 'react';
import { Card, Table, Typography, Spin, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useActivityLogs } from '../hooks/useActivityLogs';
import type { ActivityLog } from '../types';


const { Title } = Typography;

const columns: ColumnsType<ActivityLog> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Hành động',
    dataIndex: 'actionType',
    key: 'actionType',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Thời gian',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: string) =>
      dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss'),
  },
  {
    title: 'Bảng ảnh hưởng',
    dataIndex: 'targetTable',
    key: 'targetTable',
  },
  {
    title: 'ID mục tiêu',
    dataIndex: 'targetId',
    key: 'targetId',
  },
];

const ActivityLogPage: React.FC = () => {
  const { data: activityLogs, isLoading, error } = useActivityLogs();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Đang tải nhật ký hoạt động..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Lỗi tải dữ liệu"
          description={`Không thể tải nhật ký hoạt động: ${(error as Error).message}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 16 }}>
        Nhật ký Hoạt động
      </Title>
      <Card>
        <Table
          columns={columns}
          dataSource={activityLogs || []} 
          rowKey="id"
          pagination={{ pageSize: 7 }}
        />
      </Card>
    </div>
  );
};

export default ActivityLogPage;
