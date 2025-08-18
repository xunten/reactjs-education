/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Card,
  Table,
  Typography,
  Button,
  Space,
  Row,
  Col,
  Input,
  Spin,
  Alert,
  Modal,
  Form,
  InputNumber,
  DatePicker,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useQuizzes } from '../hooks/useQuizzes';
import type { Quiz } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Search } = Input;
const { confirm } = Modal;

const QuizManagementPage: React.FC = () => {
  const { quizzes, isLoading, error, deleteQuiz } = useQuizzes();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  const [form] = Form.useForm();

  // Tính stats
  const totalQuizzes = quizzes.length;
  const upcomingQuizzes = quizzes.filter(q => new Date(q.endDate).getTime() > Date.now()).length;

  // Thêm / Sửa Quiz
  const openModal = (quiz?: Quiz) => {
    setEditingQuiz(quiz || null);
    setIsModalVisible(true);
    form.resetFields();
    if (quiz) {
      form.setFieldsValue({
        ...quiz,
        startDate: dayjs(quiz.startDate),
        endDate: dayjs(quiz.endDate),
      });
    }
  };

  const handleModalCancel = () => setIsModalVisible(false);

  const handleFormFinish = async (values: any) => {
    try {
      if (editingQuiz) {
        // Sửa
        await fetch(`/quizzes/${editingQuiz.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...values,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
          }),
        });
      } else {
        // Thêm mới
        await fetch('/quizzes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...values,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
          }),
        });
      }
      setIsModalVisible(false);
      window.location.reload(); // Hoặc invalidate query nếu dùng react-query
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa Quiz
  const handleDelete = (quiz: Quiz) => {
    confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc muốn xóa bài kiểm tra "${quiz.title}"?`,
      onOk() {
        deleteQuiz(quiz.id);
      },
    });
  };

  const columns = [
    { title: 'Tên Bài kiểm tra', dataIndex: 'title', key: 'title' },
    { title: 'Thời gian (phút)', dataIndex: 'timeLimit', key: 'timeLimit' },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    { title: 'ID Lớp học', dataIndex: 'classId', key: 'classId' },
    { title: 'Người tạo', dataIndex: 'createdBy', key: 'createdBy' },
    { title: 'Khối', dataIndex: 'grade', key: 'grade' },
    { title: 'Môn học', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Quiz) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  if (isLoading)
    return (
      <Spin tip="Đang tải dữ liệu..." size="large" style={{ display: 'block', margin: '50px auto' }} />
    );

  if (error)
    return <Alert message="Lỗi tải dữ liệu" type="error" showIcon description={(error as Error).message} />;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Bài kiểm tra</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Space align="center">
              <FileTextOutlined style={{ fontSize: 32, color: '#1890ff' }} />
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
              <ClockCircleOutlined style={{ fontSize: 32, color: '#faad14' }} />
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
        extra={<Button type="default" icon={<PlusOutlined />} onClick={() => openModal()}>Thêm Bài kiểm tra mới</Button>}
      >
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Search placeholder="Tìm kiếm bài kiểm tra..." style={{ width: 300 }} />
        </Space>
        <Table columns={columns} dataSource={quizzes} rowKey="id" />
      </Card>

      <Modal
        title={editingQuiz ? 'Chỉnh sửa Bài kiểm tra' : 'Thêm Bài kiểm tra mới'}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        okText={editingQuiz ? 'Cập nhật' : 'Thêm'}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFormFinish}>
          <Form.Item name="title" label="Tên bài kiểm tra" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="timeLimit" label="Thời gian (phút)" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="classId" label="ID Lớp học" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="grade" label="Khối" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Môn học" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="createdBy" label="Người tạo" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuizManagementPage;
