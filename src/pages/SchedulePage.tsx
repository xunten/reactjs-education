/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/SchedulePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Table, Tag, Button, Modal, Form, Input, Select, Upload, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useClasses } from '../hooks/useClasses';
import { useSchedules } from '../hooks/useSchedules';
import { useSessions } from '../hooks/useSessions';
import { useLocations } from '../hooks/useLocations';
import { useLessonPlans } from '../hooks/useLessonPlans';
import { useUsers } from '../hooks/useUsers';
import type { SchedulePattern, ScheduleSession } from '../types/Schedule';
import type { Location, User } from '../types';

const { TabPane } = Tabs;

const dayOfWeekOptions = [
    { label: 'Thứ Hai', value: 2 },
    { label: 'Thứ Ba', value: 3 },
    { label: 'Thứ Tư', value: 4 },
    { label: 'Thứ Năm', value: 5 },
    { label: 'Thứ Sáu', value: 6 },
    { label: 'Thứ Bảy', value: 7 },
];

const SchedulePage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

    const [patternModalOpen, setPatternModalOpen] = useState(false);
    const [editingPattern, setEditingPattern] = useState<SchedulePattern | null>(null);
    const [lessonPlanModalOpen, setLessonPlanModalOpen] = useState(false);
    const [editingLessonPlan, setEditingLessonPlan] = useState<any>(null);

    const [patternForm] = Form.useForm();
    const [lessonPlanForm] = Form.useForm();

    const { classes } = useClasses();
    const { schedules, isLoading: schedulesLoading, createSchedules, updateSchedules, deleteSchedule } =
        useSchedules(selectedClassId || undefined);
    const { data: sessions, isLoading: sessionsLoading } = useSessions(selectedClassId || undefined);
    const { locations } = useLocations();
    const { lessonPlans, createLessonPlan, updateLessonPlan, deleteLessonPlan } =
        useLessonPlans(selectedClassId || undefined);
    const { data: users } = useUsers();

    const teachers: User[] = users?.filter(u => u.roles.some(r => r.name === 'teacher')) || [];

    /** PATTERN HANDLERS */
    const openEditPattern = (pattern: SchedulePattern) => {
        setEditingPattern(pattern);
        setPatternModalOpen(true);
        patternForm.setFieldsValue({
            classId: pattern.classId,
            teacherId: pattern.userId,
            dayOfWeek: pattern.dayOfWeek,
            startTime: pattern.startTime,
            endTime: pattern.endTime,
            locationId: pattern.location,
        });
    };

    const handlePatternSubmit = async () => {
        const values = await patternForm.validateFields();
        if (editingPattern) {
            await updateSchedules({ patterns: [{ ...editingPattern, ...values }] });
        } else {
            await createSchedules([{ ...values, classId: selectedClassId! }]);
        }
        setPatternModalOpen(false);
        setEditingPattern(null);
        patternForm.resetFields();
    };

    const handleDeletePattern = async (id: number) => {
        await deleteSchedule(id);
    };

    /** LESSON PLAN HANDLERS */
    const openEditLessonPlan = (plan: any) => {
        setEditingLessonPlan(plan);
        setLessonPlanModalOpen(true);
        lessonPlanForm.setFieldsValue(plan);
    };

    const handleLessonPlanSubmit = async () => {
        const values = await lessonPlanForm.validateFields();
        if (editingLessonPlan) {
            await updateLessonPlan({ id: editingLessonPlan.id, data: values });
        } else {
            await createLessonPlan(values);
        }
        setLessonPlanModalOpen(false);
        setEditingLessonPlan(null);
        lessonPlanForm.resetFields();
    };

    const handleDeleteLessonPlan = async (id: number) => {
        await deleteLessonPlan(id);
    };

    /** TABLE COLUMNS */
    const scheduleColumns = [
        { title: 'Thứ', dataIndex: 'dayOfWeek' },
        { title: 'Giờ bắt đầu', dataIndex: 'startTime' },
        { title: 'Giờ kết thúc', dataIndex: 'endTime' },
        {
            title: 'Giáo viên',
            dataIndex: 'userId',
            render: (id: number) => teachers.find(t => t.id === id)?.full_name || '',
        },
        { title: 'Địa điểm', dataIndex: 'location', render: (loc: string) => <Tag>{loc}</Tag> },
        {
            title: 'Hành động',
            render: (_: any, record: SchedulePattern) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openEditPattern(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDeletePattern(record.id)} />
                </Space>
            ),
        },
    ];

    const sessionColumns = [
        { title: 'Buổi', dataIndex: 'id' },
        { title: 'Thời gian', render: (_: any, record: ScheduleSession) => `${record.startTime} - ${record.endTime}` },
    ];

    const locationColumns = [
        { title: 'Tên phòng', dataIndex: 'room_name' },
        { title: 'Mô tả', dataIndex: 'description' },
    ];

    const lessonPlanColumns = [
        { title: 'Buổi', dataIndex: 'session_number' },
        { title: 'Tiêu đề', dataIndex: 'title' },
        { title: 'Mô tả', dataIndex: 'description' },
        {
            title: 'Tài liệu',
            render: (_: any, record: any) => (
                <Button type="link" onClick={() => navigate(`/materials?lessonPlanId=${record.id}`)}>Xem tài liệu</Button>
            ),
        },
        {
            title: 'Hành động',
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openEditLessonPlan(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteLessonPlan(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <h1>Quản Lý Thời Khóa Biểu</h1>

            <Select
                placeholder="Chọn lớp"
                value={selectedClassId || undefined}
                onChange={setSelectedClassId}
                style={{ width: 200, marginBottom: 16 }}
                options={classes?.map(c => ({ label: c.className, value: c.id }))}
            />

            <Tabs defaultActiveKey="1">
                <TabPane tab="Lịch Trình" key="1">
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setPatternModalOpen(true)} disabled={!selectedClassId}>
                        Thêm Lịch Trình
                    </Button>
                    <Table
                        style={{ marginTop: 16 }}
                        dataSource={schedules || []}
                        columns={scheduleColumns}
                        rowKey="id"
                        loading={schedulesLoading}
                    />
                </TabPane>

                <TabPane tab="Buổi Học" key="2">
                    <Table dataSource={sessions || []} columns={sessionColumns} rowKey="id" loading={sessionsLoading} />
                </TabPane>

                <TabPane tab="Địa Điểm" key="3">
                    <Table dataSource={locations || []} columns={locationColumns} rowKey="id" />
                </TabPane>

                <TabPane tab="Giáo Án" key="4">
                    <Space style={{ marginBottom: 16 }}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Import Excel</Button>
                        </Upload>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setLessonPlanModalOpen(true)} disabled={!selectedClassId}>
                            Thêm Giáo Án
                        </Button>
                    </Space>
                    <Table dataSource={lessonPlans || []} columns={lessonPlanColumns} rowKey="id" />
                </TabPane>
            </Tabs>

            {/* PATTERN MODAL */}
            <Modal
                title={editingPattern ? 'Chỉnh sửa Lịch Trình' : 'Thêm Lịch Trình'}
                open={patternModalOpen}
                onCancel={() => { setPatternModalOpen(false); setEditingPattern(null); patternForm.resetFields(); }}
                onOk={handlePatternSubmit}
            >
                <Form form={patternForm} layout="vertical">
                    <Form.Item name="classId" label="Lớp" rules={[{ required: true }]}>
                        <Select options={classes?.map(c => ({ label: c.className, value: c.id }))} />
                    </Form.Item>
                    <Form.Item name="teacherId" label="Giáo viên" rules={[{ required: true }]}>
                        <Select options={teachers.map(t => ({ label: t.full_name, value: t.id }))} />
                    </Form.Item>
                    <Form.Item name="dayOfWeek" label="Thứ" rules={[{ required: true }]}>
                        <Select options={dayOfWeekOptions} />
                    </Form.Item>
                    <Form.Item name="startTime" label="Giờ bắt đầu" rules={[{ required: true }]}>
                        <Input type="time" />
                    </Form.Item>
                    <Form.Item name="endTime" label="Giờ kết thúc" rules={[{ required: true }]}>
                        <Input type="time" />
                    </Form.Item>
                    <Form.Item name="locationId" label="Địa điểm" rules={[{ required: true }]}>
                        <Select
                            options={locations?.map((l: Location) => ({ label: l.roomName, value: l.id }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {/* LESSON PLAN MODAL */}
            <Modal
                title={editingLessonPlan ? 'Chỉnh sửa Giáo Án' : 'Thêm Giáo Án'}
                open={lessonPlanModalOpen}
                onCancel={() => { setLessonPlanModalOpen(false); setEditingLessonPlan(null); lessonPlanForm.resetFields(); }}
                onOk={handleLessonPlanSubmit}
            >
                <Form form={lessonPlanForm} layout="vertical">
                    <Form.Item name="sessionNumber" label="Buổi" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SchedulePage;
