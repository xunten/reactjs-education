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
  Spin, 
  Alert,
} from 'antd';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Class } from '../types';
import { useClasses } from '../hooks/useClasses';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const ClassManagementPage: React.FC = () => {
  const [form] = Form.useForm();
  const { 
    classes, 
    isLoading, 
    error, 
    createClass, 
    updateClass, 
    deleteClass,
    isCreating,
    isUpdating,
    isDeleting,
  } = useClasses(); // Sử dụng hook useClasses

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  // Hiển thị trạng thái loading/error khi fetch dữ liệu ban đầu
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Đang tải danh sách lớp học..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Lỗi tải dữ liệu"
          description={`Không thể tải danh sách lớp học: ${(error as Error).message}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const showModal = (record?: Class) => {
    setEditingClass(record || null);
    setIsModalVisible(true);
    if (record) {
      // Đối với năm học, đảm bảo nó là number
      form.setFieldsValue({ ...record, schoolYear: Number(record.schoolYear) });
    } else {
      form.resetFields();
      // Đặt giá trị mặc định cho năm học là năm hiện tại khi thêm mới
      form.setFieldsValue({ schoolYear: dayjs().year() });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingClass(null);
    form.resetFields();
  };

  const handleFinish = async (values: Class) => {
    try {
      if (editingClass) {
        // Cập nhật lớp học
        await updateClass({ ...editingClass, ...values });
        message.success('Cập nhật lớp học thành công');
      } else {
        // Thêm lớp học mới (bỏ qua ID vì backend sẽ tạo)
        await createClass(values); // values sẽ là ClassCreateDTO
        message.success('Thêm lớp học thành công');
      }
      handleCancel(); // Đóng modal và reset form
    } catch (err) {
      console.error('Lỗi khi lưu lớp học:', err);
      message.error('Có lỗi xảy ra khi lưu lớp học.');
    }
  };

  const handleDelete = (record: Class) => {
    Modal.confirm({
      title: 'Xác nhận xóa lớp học',
      content: `Bạn có chắc muốn xóa lớp: ${record.className}?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          if (record.id) { // Đảm bảo có ID để xóa
            await deleteClass(record.id);
            message.success('Đã xóa lớp học');
          } else {
            message.error('Không tìm thấy ID lớp học để xóa.');
          }
        } catch (err) {
          console.error('Lỗi khi xóa lớp học:', err);
          message.error('Có lỗi xảy ra khi xóa lớp học.');
        }
      },
    });
  };

  const columns: ColumnsType<Class> = [
    { title: 'ID', dataIndex: 'id', key: 'id' }, // Hiển thị ID cho quản lý
    { title: 'Tên lớp', dataIndex: 'className', key: 'className' },
    { title: 'Năm học', dataIndex: 'schoolYear', key: 'schoolYear' },
    { title: 'Học kỳ', dataIndex: 'semester', key: 'semester' },
    { title: 'Giáo viên', dataIndex: 'fullName', key: 'fullName' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => showModal(record)}>Chỉnh sửa</Menu.Item>
              <Menu.Item key="delete" danger onClick={() => handleDelete(record)}>Xóa</Menu.Item>
              <Menu.Item key="students">Danh sách học sinh</Menu.Item>
              <Menu.Item key="assignments">Danh sách bài tập</Menu.Item>
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
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <Title level={3} style={{ margin: 0 }}>Quản lý Lớp học</Title>
        <Button 
          type="default" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          loading={isCreating} // Hiển thị loading khi đang tạo
        >
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
          dataSource={classes || []} // Đảm bảo dataSource là mảng rỗng nếu chưa có dữ liệu
          rowKey="id"
          pagination={{ pageSize: 7 }}
          loading={isLoading || isDeleting} // Thêm loading cho bảng khi đang fetch hoặc xóa
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
        okType='default'
        confirmLoading={isCreating || isUpdating} // Hiển thị loading cho nút OK khi đang tạo/cập nhật
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={{ schoolYear: dayjs().year() }} // Set năm học mặc định là năm hiện tại
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
            <InputNumber min={1900} max={2100} style={{ width: '100%' }} />
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
            label="Giáo viên phụ trách (ID)"
            name="teacherId"
            rules={[{ required: true, message: 'Vui lòng nhập ID giáo viên' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
            
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassManagementPage;
