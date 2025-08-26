import React, { useState, useMemo, useCallback } from 'react';
import { Card, Table, Typography, Button, Space, Row, Col, Input, Modal, Form, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import type { Subject } from '../types';
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from '../hooks/useSubjects';
import dayjs from 'dayjs';
import { useDebounce } from 'use-debounce';

const { Title, Text } = Typography;
const { Search } = Input;

const removeVietnameseTones = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

const SubjectManagementPage: React.FC = () => {
  // Hooks gọi API
  const { data: subjects = [], isLoading } = useSubjects();
  const createSubject = useCreateSubject();
  const updateSubject = useUpdateSubject();
  const deleteSubject = useDeleteSubject();

  // State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // ✅ Handlers bọc useCallback để tránh re-create mỗi lần render
  const handleAddSubject = useCallback(() => {
    setEditingSubject(null);
    form.resetFields();
    setIsModalVisible(true);
  }, [form]);

  const handleEditSubject = useCallback((subject: Subject) => {
    setEditingSubject(subject);
    form.setFieldsValue(subject);
    setIsModalVisible(true);
  }, [form]);

  const handleDeleteSubject = useCallback((subjectId: number) => {
    deleteSubject.mutate(subjectId);
  }, [deleteSubject]);

  const handleSave = useCallback(() => {
    form.validateFields().then(values => {
      if (editingSubject) {
        updateSubject.mutate({ subjectId: editingSubject.id, subjectData: values });
      } else {
        createSubject.mutate(values);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  }, [editingSubject, updateSubject, createSubject, form]);

  // ✅ Columns chỉ tạo 1 lần nhờ useMemo
  const columns = useMemo(
    () => [
      { title: 'Subject Name', dataIndex: 'subjectName', key: 'subjectName' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) => dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss'),
      },
      {
        title: 'Actions',
        key: 'action',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (_: any, record: Subject) => (
          <Space size="middle">
            <Button icon={<EditOutlined />} onClick={() => handleEditSubject(record)} />
            <Popconfirm
              title="Are you sure you want to delete this subject?"
              onConfirm={() => handleDeleteSubject(record.id)}
              okText="Yes"
              okType="danger"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleEditSubject, handleDeleteSubject]
  );

  // ✅ Search có debounce
  const filteredSubjects = useMemo(() => {
    return subjects.filter(s =>
      removeVietnameseTones(s.subjectName)
        .toLowerCase()
        .includes(removeVietnameseTones(debouncedSearchTerm).toLowerCase())
    );
  }, [subjects, debouncedSearchTerm]);

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <Title level={2} style={{ marginBottom: 16 }}>
        📚 Subject Management
      </Title>

      {/* Thống kê */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card style={{ background: '#fafafa' }}>
            <Space align="center">
              <BookOutlined style={{ fontSize: 32, color: '#1677ff' }} />
              <div>
                <Text strong>Total Subjects</Text>
                <Title level={3} style={{ margin: 0 }}>
                  {subjects.length}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Danh sách */}
      <Card
        title={<Text strong style={{ fontSize: 16 }}>Subject List</Text>}
        extra={
          <Button type="default" icon={<PlusOutlined />} onClick={handleAddSubject}>
            Add New Subject
          </Button>
        }
      >
        <Row justify="space-between" style={{ marginBottom: 16 }}>
          <Col>
            <Search
              placeholder="Search subject..."
              style={{ width: 300 }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredSubjects}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 7 }} // 👉 sau này có thể đổi sang server-side
        />
      </Card>

      {/* Modal */}
      <Modal
        destroyOnClose
        title={editingSubject ? 'Edit Subject' : 'Add New Subject'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
        okType="default"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" initialValues={editingSubject || {}}>
          <Form.Item
            name="subjectName"
            label="Subject Name"
            rules={[{ required: true, message: 'Please enter subject name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubjectManagementPage;
