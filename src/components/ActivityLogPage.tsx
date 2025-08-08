import React from 'react';
import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ActivityLog } from '../types';
import dayjs from 'dayjs';

const { Title } = Typography;

const activityLogs: ActivityLog[] = [
  {
    id: 1,
    actionType: 'CREATE',
    targetTable: 'users',
    targetId: 1,
    description: 'Đăng nhập',
    classId: 1,
    userId: 1,
    userName: 'admin',
    timestamp: new Date('2025-08-07T08:00:00Z'),
  },
  {
    id: 2,
    actionType: 'CREATE',
    targetTable: 'assignments',
    targetId: 2,
    description: 'Tạo bài tập mới',
    classId: 1,
    userId: 2,
    userName: 'teacher1',
    timestamp: new Date('2025-08-07T08:05:00Z'),
  },
  {
    id: 3,
    actionType: 'UPDATE',
    targetTable: 'submissions',
    targetId: 3,
    description: 'Nộp bài tập Tuần 2',
    classId: 1,
    userId: 3,
    userName: 'student1',
    timestamp: new Date('2025-08-07T08:10:00Z'),
  },
];


const columns: ColumnsType<ActivityLog> = [
  {
    title: 'Tên người dùng',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Hành động',
    dataIndex: 'actionType',
    key: 'action',
  },
  {
    title: 'Thời gian',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (timestamp: Date) =>
      dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss'),
  },
];

const ActivityLogPage: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 16 }}>
        Nhật ký Hoạt động
      </Title>
      <Card>
        <Table
          columns={columns}
          dataSource={activityLogs}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ActivityLogPage;
