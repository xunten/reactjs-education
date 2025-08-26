import React, { useState, useMemo } from 'react';
import {
  Card,
  Table,
  Typography,
  Button,
  Dropdown,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Spin,
  Alert,
  Radio,
  Popconfirm,
  Space,
} from 'antd';
import { BookOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Class } from '../types';
import { useClasses } from '../hooks/useClasses';
import { useSubjects } from '../hooks/useSubjects';
import { useUsers } from '../hooks/useUsers';
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
  } = useClasses();

  const { data: subjects = [], isLoading: isSubjectsLoading } = useSubjects();
  const { data: users = [], isLoading: isUsersLoading } = useUsers();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [searchText, setSearchText] = useState('');

  // Map lookup để tối ưu tìm kiếm
  const subjectMap = useMemo(() => {
    const map = new Map<number, string>();
    subjects.forEach(sub => map.set(sub.id, sub.subjectName));
    return map;
  }, [subjects]);

  const teacherMap = useMemo(() => {
    const map = new Map<number, string>();
    users.forEach(u => {
      if (Array.isArray(u.roles) && u.roles.some(r => r.name.toLowerCase() === 'teacher')) {
        map.set(u.id, u.full_name);
      }
    });
    return map;
  }, [users]);

  const classesWithNames = useMemo(() => {
    if (!classes) return [];
    const search = searchText.toLowerCase();
    return classes
      .map(cls => ({
        ...cls,
        subjectName: subjectMap.get(cls.subjectId) || 'N/A',
        fullName: teacherMap.get(cls.teacherId) || 'N/A',
      }))
      .filter(c => c.className.toLowerCase().includes(search));
  }, [classes, subjectMap, teacherMap, searchText]);

  if (isLoading || isSubjectsLoading || isUsersLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Loading data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Error loading data"
          description={`Could not load class list: ${(error as Error).message}`}
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
      form.setFieldsValue({
        ...record,
        schoolYear: Number(record.schoolYear),
        semester: record.semester,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ schoolYear: dayjs().year(), semester: '' });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingClass(null);
    form.resetFields();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = async (values: any) => {
    try {
      const payload = { ...values, semester: values.semester };
      if (editingClass) {
        await updateClass({ ...editingClass, ...payload });
        message.success('Class updated successfully');
      } else {
        await createClass(payload);
        message.success('Class created successfully');
      }
      handleCancel();
    } catch (err) {
      console.error('Error saving class:', err);
      message.error('An error occurred while saving the class.');
    }
  };

  const handleDelete = async (record: Class) => {
    if (record.id) {
      await deleteClass(record.id);
      message.success('Class deleted');
    } else {
      message.error('Could not find class ID to delete.');
    }
  };

  const columns: ColumnsType<Class & { subjectName: string; fullName: string }> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Class Name', dataIndex: 'className', key: 'className' },
    { title: 'Subject', dataIndex: 'subjectName', key: 'subjectName' },
    { title: 'School Year', dataIndex: 'schoolYear', key: 'schoolYear' },
    { title: 'Semester', dataIndex: 'semester', key: 'semester' },
    { title: 'Teacher', dataIndex: 'fullName', key: 'fullName' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              { key: 'edit', label: 'Edit', onClick: () => showModal(record) },
              {
                key: 'delete',
                label: (
                  <Popconfirm
                    title="Confirm class deletion"
                    description={`Are you sure you want to delete: ${record.className}?`}
                    okText="Delete"
                    okType="danger"
                    cancelText="Cancel"
                    onConfirm={() => handleDelete(record)}
                  >
                    <span style={{ color: 'red' }}>Delete</span>
                  </Popconfirm>
                ),
              },
              { key: 'students', label: 'Student List' },
              { key: 'assignments', label: 'Assignments' },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>Class Management</Title>

      <Card style={{ marginBottom: 24 }}>
        <Space>
          <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <div>
            <Text strong>Total Classes:</Text>{' '}
            <Text type="secondary">{classes?.length}</Text>
          </div>
        </Space>
      </Card>

      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Input.Search
            placeholder="Search class by name"
            style={{ width: 250 }}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="default" icon={<PlusOutlined />} onClick={() => showModal()} loading={isCreating}>
            Add Class
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={classesWithNames}
          rowKey="id"
          pagination={{ pageSize: 7 }}
          loading={isLoading || isDeleting}
        />
      </Card>

      <Modal
        title={editingClass ? 'Edit Class' : 'Add New Class'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okText={editingClass ? 'Update' : 'Create'}
        cancelText="Cancel"
        okType="default"
        confirmLoading={isCreating || isUpdating}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={{ schoolYear: dayjs().year(), semester: '' }}
        >
          <Form.Item label="Class Name" name="className" rules={[{ required: true, message: 'Please enter class name' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter class description' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="School Year" name="schoolYear" rules={[{ required: true, message: 'Please enter school year' }]}>
            <InputNumber min={1900} max={2100} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Semester" name="semester" rules={[{ required: true, message: 'Please select semester' }]}>
            <Radio.Group>
              <Radio value="Semester 1">Semester 1</Radio>
              <Radio value="Semester 2">Semester 2</Radio>
              <Radio value="Summer">Summer</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Subject" name="subjectId" rules={[{ required: true, message: 'Please select subject' }]}>
            <Select placeholder="Select subject">
              {subjects.map(sub => <Option key={sub.id} value={sub.id}>{sub.subjectName}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="Teacher" name="teacherId" rules={[{ required: true, message: 'Please select teacher' }]}>
            <Select placeholder="Select teacher">
              {Array.from(teacherMap.entries()).map(([id, name]) => (
                <Option key={id} value={id}>{name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassManagementPage;
