import React from 'react';
import { Input, Button, Tag, Table, Dropdown, Menu, Card, Typography, Space } from 'antd';
import {
  PlusOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  AppstoreAddOutlined,
  EllipsisOutlined,
  SearchOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const suggestedExams = [
  {
    name: 'on-giua-ki-lsd-1-on-tap-gki.docx',
    createdAt: '16/03/2025 20:52',
    duration: '40 phút',
    submissions: 16,
  },
  {
    name: 'Thi-giữa-kỳ ().docx',
    createdAt: '08/10/2024 23:36',
    duration: '40 phút',
    submissions: 10,
  },
];

const allExams = [
  {
    key: '1',
    name: 'on-giua-ki-lsd-1-on-tap-gki.docx',
    submissions: 16,
    status: 'Đã xuất bản',
    assignedTo: 'Tất cả mọi người',
    time: '17/03/2025 13:35 -> 19/03/2025 13:50',
  },
  {
    key: '2',
    name: 'Thi-giữa-kỳ ().docx',
    submissions: 10,
    status: 'Đã xuất bản',
    assignedTo: 'Tất cả mọi người',
    time: '08/10/2024 23:40 -> 09/10/2024 00:00',
  },
];

const Exam = () => {
  const navigate = useNavigate();

  const menu = (
    <Menu
      items={[
        { key: 'edit', label: 'Chỉnh sửa' },
        { key: 'delete', label: 'Xoá', danger: true },
      ]}
    />
  );

  const columns = [
    {
      title: 'TÊN ĐỀ THI',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <div className="bg-blue-100 p-2 rounded-lg">
            <FileAddOutlined className="text-blue-600" />
          </div>
          <Text strong className="text-gray-800">{text}</Text>
        </Space>
      ),
    },
    {
      title: 'BÀI ĐÃ NỘP',
      dataIndex: 'submissions',
      key: 'submissions',
      render: (count: number) => <Tag color="green" className="font-medium">{count}</Tag>,
    },
    {
      title: 'TRẠNG THÁI',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag 
          color={status === 'Đã xuất bản' ? 'green' : 'orange'} 
          className="font-medium"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'GIAO CHO',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (text: string) => <Text className="text-gray-600">{text}</Text>,
    },
    {
      title: 'THỜI GIAN THI',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined className="text-gray-500" />
          <Text className="text-gray-600">{text}</Text>
        </Space>
      ),
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button 
            shape="circle" 
            icon={<EllipsisOutlined />} 
            className="border-none shadow-none"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <Card className="rounded-xl shadow-sm border-0 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title level={4} className="!mb-0 !text-gray-800">Quản lý đề thi</Title>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Input.Search 
              placeholder="Tìm kiếm đề thi..." 
              prefix={<SearchOutlined />}
              className="w-full md:w-64"
            />
            <Button icon={<AppstoreAddOutlined />} className="hidden md:inline-flex">
              Ngân hàng chung
            </Button>
            <Button icon={<FolderAddOutlined />} className="hidden md:inline-flex">
              Thư mục
            </Button>
            <Button 
              onClick={() => navigate('/exam/create')} 
              icon={<PlusOutlined />} 
              type="primary"
              className="w-full md:w-auto"
            >
              Tạo đề thi
            </Button>
          </div>
        </div>
      </Card>

      {/* Suggested Exams */}
      <Card className="rounded-xl shadow-sm border-0 mb-6">
        <div className="flex justify-between items-center mb-4">
          <Title level={5} className="!mb-0 !text-gray-800">Đề thi đề xuất</Title>
          <Button type="link" className="text-blue-600 font-medium">Xem tất cả</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedExams.map((exam, idx) => (
            <Card 
              key={idx} 
              hoverable
              className="border border-gray-200 rounded-lg transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <Text strong className="block text-blue-700 truncate max-w-xs">
                    {exam.name}
                  </Text>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div>
                      <Text type="secondary" className="text-xs block">Ngày tạo</Text>
                      <Text className="text-sm">{exam.createdAt}</Text>
                    </div>
                    <div>
                      <Text type="secondary" className="text-xs block">Thời lượng</Text>
                      <Text className="text-sm">{exam.duration}</Text>
                    </div>
                  </div>
                </div>
                <Tag color="green" className="!m-0 h-fit">
                  {exam.submissions} bài
                </Tag>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* All Exams */}
      <Card className="rounded-xl shadow-sm border-0">
        <div className="flex justify-between items-center mb-4">
          <Title level={5} className="!mb-0 !text-gray-800">Tất cả đề thi</Title>
          <div className="flex gap-2">
            <Button>Bộ lọc</Button>
            <Button>Sắp xếp</Button>
          </div>
        </div>
        
        <Table 
          dataSource={allExams} 
          columns={columns}
          pagination={{ 
            position: ['bottomRight'], 
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20']
          }}
          className="rounded-lg overflow-hidden"
          rowClassName="hover:bg-gray-50"
        />
      </Card>
    </div>
  );
};

export default Exam;