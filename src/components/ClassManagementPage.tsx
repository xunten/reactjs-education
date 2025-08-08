import React, { useState } from 'react';
import {
  Card,
  Table,
  Typography,
  Button,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from 'antd';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Class } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;

const initialClasses: Class[] = [
  { id: 1, className: 'Math 101', schoolYear: 2023, semester: 'Học kỳ 1', teacherId: 2, teacherName: 'Mr. Smith' },
  { id: 2, className: 'Lớp 12A1', schoolYear: 2025, semester: 'Học kỳ 1', teacherId: 2, teacherName: 'Ms. Alice' },
];

const ClassManagementPage: React.FC = () => {
  const [form] = Form.useForm();
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const showModal = (record?: Class) => {
    setEditingClass(record || null);
    setIsModalVisible(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingClass(null);
    form.resetFields();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (values: any) => {
    if (editingClass) {
      setClasses(classes.map(cls => cls.id === editingClass.id ? { ...cls, ...values } : cls));
      message.success('Cập nhật lớp học thành công');
    } else {
      const newClass = { ...values, id: Date.now() };
      setClasses([...classes, newClass]);
      message.success('Thêm lớp học thành công');
    }
    setIsModalVisible(false);
    setEditingClass(null);
    form.resetFields();
  };

  const handleDelete = (record: Class) => {
    Modal.confirm({
      title: 'Xác nhận xóa lớp học',
      content: `Bạn có chắc muốn xóa lớp: ${record.className}?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setClasses(classes.filter(cls => cls.id !== record.id));
        message.success('Đã xóa lớp học');
      }
    });
  };

  const columns: ColumnsType<Class> = [
    { title: 'Tên lớp', dataIndex: 'className', key: 'className' },
    { title: 'Năm học', dataIndex: 'schoolYear', key: 'schoolYear' },
    { title: 'Học kỳ', dataIndex: 'semester', key: 'semester' },
    { title: 'Giáo viên', dataIndex: 'teacherName', key: 'teacherName' },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item onClick={() => showModal(record)}>Chỉnh sửa</Menu.Item>
              <Menu.Item onClick={() => handleDelete(record)}>Xóa</Menu.Item>
              <Menu.Item>Danh sách học sinh</Menu.Item>
              <Menu.Item>Danh sách bài tập</Menu.Item>
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Header giống shadcn/ui */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <Title level={3} style={{ margin: 0 }}>Quản lý Lớp học</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Thêm lớp học
        </Button>
      </div>

      {/* Card chứa bảng */}
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>Danh sách Lớp học</Title>
          <Text type="secondary">Quản lý tất cả các lớp học trong trường.</Text>
        </div>
        <Table
          columns={columns}
          dataSource={classes}
          rowKey="id"
          pagination={{ pageSize: 7 }}
        />
      </Card>

      {/* Modal Form */}
      <Modal
        title={editingClass ? 'Chỉnh sửa lớp học' : 'Thêm lớp học mới'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText={editingClass ? 'Cập nhật' : 'Thêm mới'}
        cancelText="Hủy"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={{ schoolYear: new Date().getFullYear() }}
        >
          <Form.Item
            label="Tên lớp học"
            name="className"
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Năm học"
            name="schoolYear"
            rules={[{ required: true, message: 'Vui lòng nhập năm học' }]}
          >
            <InputNumber min={2000} max={2100} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Học kỳ"
            name="semester"
            rules={[{ required: true, message: 'Vui lòng chọn học kỳ' }]}
          >
            <Select placeholder="Chọn học kỳ">
              <Option value="Học kỳ 1">Học kỳ 1</Option>
              <Option value="Học kỳ 2">Học kỳ 2</Option>
              <Option value="Hè">Hè</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Giáo viên phụ trách (teacherId)"
            name="teacherId"
            rules={[{ required: true, message: 'Vui lòng nhập teacherId' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassManagementPage;
