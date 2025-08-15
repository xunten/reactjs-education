import React from 'react';
import { Card, Table, Typography, Button, Space, Row, Col, Input, Tag, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, MoreOutlined, FileOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ClassMaterial } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;

// Dữ liệu giả định
const materials: ClassMaterial[] = [
  { id: 1, title: 'Slide bài giảng Tuần 1', className: 'Math 101', file_type: 'PDF', createdBy: 'Teacher Alice', created_at: new Date('2025-08-01'), file_path: '/files/slide_tuan_1.pdf', updated_at: new Date('2025-08-01'), classID: 1, downloadCount: 0 },
  { id: 2, title: 'Bài tập về nhà', className: 'Math 101', file_type: 'DOCX', createdBy: 'Teacher Alice', created_at: new Date('2025-08-02'), file_path: '/files/baitap.docx', updated_at: new Date('2025-08-02'), classID: 1, downloadCount: 0 },
  { id: 3, title: 'Code ví dụ Java', className: 'Lớp 12A1', file_type: 'ZIP', createdBy: 'Teacher Bob', created_at: new Date('2025-08-05'), file_path: '/files/code_java.zip', updated_at: new Date('2025-08-05'), classID: 2, downloadCount: 0 },
];

const getFileTypeTag = (fileType: string) => {
  const colorMap: { [key: string]: string } = {
    'PDF': 'red',
    'DOCX': 'blue',
    'PPTX': 'orange',
    'ZIP': 'cyan',
    'JPG': 'green',
    'PNG': 'green',
  };
  return <Tag color={colorMap[fileType] || 'default'}>{fileType}</Tag>;
};

const columns = [
  { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
  { title: 'Lớp học', dataIndex: 'className', key: 'className' },
  { title: 'Loại tệp', dataIndex: 'file_type', key: 'file_type', render: (file_type: string) => getFileTypeTag(file_type) },
  { title: 'Được tải lên bởi', dataIndex: 'createdByName', key: 'createdByName' },
  { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', render: (date: Date) => date.toLocaleDateString() },
  {
    title: 'Hành động',
    key: 'action',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (_text: any, record: ClassMaterial) => (
      <Dropdown
        menu={{
          items: [
            {
              key: 'edit',
              label: (
                <Space>
                  <EditOutlined /> Chỉnh sửa
                </Space>
              ),
            },
            {
              key: 'delete',
              label: (
                <Space>
                  <DeleteOutlined /> Xóa
                </Space>
              ),
              danger: true,
            },
            {
              key: 'download',
              label: (
                <a href={record.file_path} download className="ant-dropdown-menu-item-link">
                  <DownloadOutlined /> Tải xuống
                </a>
              ),
            },
          ],
        }}
      >
        <Button icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];

const MaterialsPage: React.FC = () => {
  const totalMaterials = materials.length;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Tài liệu</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Space align="center">
              <FileOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div>
                <Text type="secondary">Tổng số tài liệu</Text>
                <Title level={3} style={{ margin: 0 }}>{totalMaterials}</Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Space align="center">
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              <div>
                <Text type="secondary">Tài liệu gần đây</Text>
                <Title level={3} style={{ margin: 0 }}>{totalMaterials > 0 ? 1 : 0}</Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card
        title={<Text strong>Danh sách Tài liệu</Text>}
        extra={
          <Button type="default" icon={<PlusOutlined />}>
            Thêm tài liệu mới
          </Button>
        }
      >
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Search placeholder="Tìm kiếm tài liệu..." style={{ width: 300 }} />
        </Space>
        <Table columns={columns} dataSource={materials} rowKey="id" pagination={{ pageSize: 7 }} />
      </Card>
    </div>
  );
};

export default MaterialsPage;