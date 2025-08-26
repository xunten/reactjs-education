import React, { useState } from 'react';
import { Card, Table, Typography, Button, Space, Tag, Dropdown, Menu, message } from 'antd';
import { SyncOutlined, MoreOutlined, EyeOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSubmissions } from '../hooks/useSubmissions';
import type { Submission } from '../types/Submission';
import apiClient from '../api/apiClient';

const { Title, Text } = Typography;

const getStatusTag = (status: Submission['status']) => {
  switch (status) {
    case 'SUBMITTED':
      return <Tag color="blue">Đã nộp</Tag>;
    case 'GRADED':
      return <Tag color="green">Đã chấm</Tag>;
    case 'PENDING':
      return <Tag color="gold">Đang xử lý</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const SubmissionManagementPage: React.FC = () => {
  const { data: submissions, isLoading, isError, refetch, deleteSubmission } = useSubmissions();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  if (isError) message.error('Lỗi khi lấy dữ liệu nộp bài');

  // Làm mới
  const handleRefresh = () => {
    setSelectedRowKeys([]);
    refetch();
  };

  // Download 1 file
  const handleDownload = async (id: number) => {
    try {
      const res = await apiClient.get(`/submissions/${id}/download`, { responseType: 'blob' });
      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      // Tên file có thể lấy từ header hoặc từ db (ở đây tạm gán theo id)
      link.download = `submission_${id}.zip`;
      link.click();
      message.success('Tải file thành công');
    } catch {
      message.error('Lỗi khi tải file');
    }
  };

  // Download nhiều file
  const handleDownloadMultiple = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Chọn ít nhất 1 bài nộp để tải xuống');
      return;
    }
    // Có thể backend hỗ trợ zip nhiều file, ví dụ `/submissions/download?ids=...`
    try {
      const res = await apiClient.post(
        `/submissions/download`,
        { ids: selectedRowKeys },
        { responseType: 'blob' }
      );
      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `submissions_${Date.now()}.zip`;
      link.click();
      message.success('Tải nhiều file thành công');
    } catch {
      message.error('Lỗi khi tải nhiều file');
    }
  };

  const columns = [
    { title: 'ID Bài tập', dataIndex: 'assignment_id', key: 'assignment_id' },
    { title: 'ID Học sinh', dataIndex: 'student_id', key: 'student_id' },
    {
      title: 'Ngày nộp',
      dataIndex: 'submitted_at',
      key: 'submitted_at',
      render: (date: string) => moment.utc(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: Submission['status']) => getStatusTag(status),
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      key: 'score',
      render: (score: number | null) => (score !== null ? score : <Text type="secondary">Chưa chấm</Text>),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: unknown, record: Submission) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view" icon={<EyeOutlined />}>
                Xem chi tiết
              </Menu.Item>
              <Menu.Item key="download" icon={<DownloadOutlined />} onClick={() => handleDownload(record.id)}>
                Tải xuống
              </Menu.Item>
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={() => deleteSubmission(record.id)}
              >
                Xóa
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
          Quản lý Bài nộp
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
              Danh sách Bài nộp
            </Title>
            <Text type="secondary">Xem, tải xuống hoặc xóa bài nộp của học sinh.</Text>
          </div>
          <Space>
            <Button type="default" icon={<SyncOutlined />} onClick={handleRefresh}>
              Làm mới
            </Button>
            <Button type="default" icon={<DownloadOutlined />} onClick={handleDownloadMultiple}>
              Tải nhiều file
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={submissions}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 7 }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
        />
      </Card>
    </div>
  );
};

export default SubmissionManagementPage;
