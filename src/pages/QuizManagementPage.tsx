import React from 'react';
import { Card, Table, Typography, Button, Space, Row, Col, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { Quiz } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;

// Dữ liệu giả định
const quizzes: Quiz[] = [
  { id: 1, title: 'Kiểm tra giữa kỳ Toán 101', classId: 1, dueDate: new Date('2025-08-15'), maxScore: 100 },
  { id: 2, title: 'Bài kiểm tra Java cơ bản', classId: 2, dueDate: new Date('2025-08-20'), maxScore: 50 },
  { id: 3, title: 'Kiểm tra cuối kỳ', classId: 1, dueDate: new Date('2025-09-01'), maxScore: 100 },
];

const columns = [
  { title: 'Tên Bài kiểm tra', dataIndex: 'title', key: 'title' },
  { title: 'ID Lớp học', dataIndex: 'classId', key: 'classId' },
  { title: 'Hạn chót', dataIndex: 'dueDate', key: 'dueDate', render: (date: Date) => date.toLocaleDateString() },
  { title: 'Điểm tối đa', dataIndex: 'maxScore', key: 'maxScore' },
  {
    title: 'Hành động',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button icon={<EditOutlined />} />
        <Button icon={<DeleteOutlined />} danger />
      </Space>
    ),
  },
];

const QuizManagementPage: React.FC = () => {
  const totalQuizzes = quizzes.length;
  const upcomingQuizzes = quizzes.filter(q => q.dueDate.getTime() > new Date().getTime()).length;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Bài kiểm tra</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Space align="center">
              <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div>
                <Text type="secondary">Tổng số bài kiểm tra</Text>
                <Title level={3} style={{ margin: 0 }}>{totalQuizzes}</Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Space align="center">
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              <div>
                <Text type="secondary">Sắp đến hạn</Text>
                <Title level={3} style={{ margin: 0 }}>{upcomingQuizzes}</Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card
        title={<Text strong>Danh sách Bài kiểm tra</Text>}
        extra={
          <Button type="default" icon={<PlusOutlined />}>
            Thêm Bài kiểm tra mới
          </Button>
        }
      >
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Search placeholder="Tìm kiếm bài kiểm tra..." style={{ width: 300 }} />
        </Space>
        <Table columns={columns} dataSource={quizzes} rowKey="id" />
      </Card>
    </div>
  );
};

export default QuizManagementPage;