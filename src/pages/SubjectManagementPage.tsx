import React, { useState } from 'react';
import { Card, Table, Typography, Button, Space, Row, Col, Input, Modal, Form, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { Subject } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;


const initialSubjects: Subject[] = [
    {
        id: 1,
        subject_name: 'Toán Cao Cấp',
        description: 'Môn học cơ bản về đại số và giải tích.',
        created_by: 1,
        created_at: new Date('2025-08-01T10:00:00Z'),
        updated_at: new Date('2025-08-01T10:00:00Z')
    },
    {
        id: 2,
        subject_name: 'Lập trình Python',
        description: 'Giới thiệu về ngôn ngữ lập trình Python.',
        created_by: 2,
        created_at: new Date('2025-08-05T14:30:00Z'),
        updated_at: new Date('2025-08-05T14:30:00Z')
    },
    {
        id: 3,
        subject_name: 'Vật lý Đại cương',
        description: 'Các kiến thức cơ bản về cơ học và nhiệt học.',
        created_by: 1,
        created_at: new Date('2025-08-07T09:00:00Z'),
        updated_at: new Date('2025-08-07T09:00:00Z')
    },
];

const SubjectManagementPage: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [form] = Form.useForm();

    const handleAddSubject = () => {
        setEditingSubject(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditSubject = (subject: Subject) => {
        setEditingSubject(subject);
        form.setFieldsValue(subject);
        setIsModalVisible(true);
    };

    const handleDeleteSubject = (subjectId: number) => {
        setSubjects(subjects.filter(subject => subject.id !== subjectId));
    };

    const handleSave = () => {
    form.validateFields().then(values => {
        if (editingSubject) {
            setSubjects(subjects.map(subject => subject.id === editingSubject.id ? { ...editingSubject, ...values, updated_at: new Date() } : subject));
        } else {
            const newSubject: Subject = {
                ...values,
                id: Date.now(),
                created_by: 1, // Giả định người dùng hiện tại có id là 1
                created_at: new Date(),
                updated_at: new Date()
            };
            setSubjects([...subjects, newSubject]);
        }
        setIsModalVisible(false);
        form.resetFields();
    });
};

    const columns = [
        { title: 'Môn học', dataIndex: 'subject_name', key: 'subject_name' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', render: (date: Date) => moment(date).format('DD/MM/YYYY HH:mm') },
        {
            title: 'Hành động',
            key: 'action',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (_: any, record: Subject) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditSubject(record)} />
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa môn học này không?"
                        onConfirm={() => handleDeleteSubject(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const totalSubjects = subjects.length;

    return (
        <div style={{ padding: 24 }}>
            <Title level={2}>Quản lý Môn học</Title>

            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={24}>
                    <Card>
                        <Space align="center">
                            <BookOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                            <div>
                                <Text type="secondary">Tổng số môn học</Text>
                                <Title level={3} style={{ margin: 0 }}>{totalSubjects}</Title>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Card
                title={<Text strong>Danh sách Môn học</Text>}
                extra={
                    <Button type="default" icon={<PlusOutlined />} onClick={handleAddSubject}>
                        Thêm môn học mới
                    </Button>
                }
            >
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Search placeholder="Tìm kiếm môn học..." style={{ width: 300 }} />
                </Space>
                <Table columns={columns} dataSource={subjects} rowKey="id" pagination={{ pageSize: 7 }} />
            </Card>

            <Modal
                title={editingSubject ? "Chỉnh sửa môn học" : "Thêm môn học mới"}
                open={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical" initialValues={editingSubject || {}}>
                    <Form.Item name="subject_name" label="Tên môn học" rules={[{ required: true, message: 'Vui lòng nhập tên môn học!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubjectManagementPage;