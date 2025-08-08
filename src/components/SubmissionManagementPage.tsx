import React from 'react';
import { Card, Table, Typography, Button, Space, Row, Col, Tag } from 'antd';
import { FormOutlined, EyeOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import type { Submission } from '../types';

const { Title, Text } = Typography;

const submissions: Submission[] = [
  { id: 1, assignmentId: 13, studentId: 3, status: 'GRADED', score: 12 },
  { id: 2, assignmentId: 17, studentId: 3, status: 'SUBMITTED', score: undefined },
  { id: 3, assignmentId: 13, studentId: 4, status: 'SUBMITTED', score: undefined },
];

const getStatusTag = (status: string) => {
  switch (status) {
    case 'GRADED':
      return <Tag color="green">Đã chấm điểm</Tag>;
    case 'SUBMITTED':
      return <Tag color="blue">Đã nộp</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const columns = [
  { title: 'ID Bài tập', dataIndex: 'assignmentId', key: 'assignmentId' },
  { title: 'ID Học sinh', dataIndex: 'studentId', key: 'studentId' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => getStatusTag(status),
  },
  {
    title: 'Điểm số',
    dataIndex: 'score',
    key: 'score',
    render: (score: number | undefined) => score ?? <Text type="secondary">Chưa chấm</Text>,
  },
  {
    title: 'Hành động',
    key: 'action',
    render: () => (
      <Space size="middle">
        <Button icon={<EyeOutlined />} />
        <Button icon={<FormOutlined />} type="default" />
      </Space>
    ),
  },
];

const SubmissionManagementPage: React.FC = () => {
  const totalSubmissions = submissions.length;
  const pendingGrading = submissions.filter(s => s.status === 'SUBMITTED').length;
  const gradedSubmissions = submissions.filter(s => s.status === 'GRADED').length;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Bài tập đã nộp</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Space align="center">
              <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div>
                <Text type="secondary">Tổng số bài đã nộp</Text>
                <Title level={3} style={{ margin: 0 }}>{totalSubmissions}</Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Space align="center">
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              <div>
                <Text type="secondary">Cần chấm điểm</Text>
                <Title level={3} style={{ margin: 0 }}>{pendingGrading}</Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Space align="center">
              <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
              <div>
                <Text type="secondary">Đã chấm điểm</Text>
                <Title level={3} style={{ margin: 0 }}>{gradedSubmissions}</Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card
        title={<Text strong>Danh sách Bài nộp</Text>}
        extra={
          <Button type="default" icon={<FileTextOutlined />}>
            Thêm bài nộp mới
          </Button>
        }
      >
        <Table columns={columns} dataSource={submissions} rowKey="id" pagination={{ pageSize: 7 }} />
      </Card>
    </div>
  );
};

export default SubmissionManagementPage;