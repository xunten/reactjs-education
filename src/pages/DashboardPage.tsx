import React from 'react';
import { Card, Col, Row, Space, Typography } from 'antd';
import {
    BookOutlined,
    ClockCircleOutlined,
    UserOutlined,
    SolutionOutlined,
} from '@ant-design/icons';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const { Title, Text } = Typography;

// Định nghĩa kiểu dữ liệu cho biểu đồ
interface PieChartData {
    name: string;
    value: number;
}
interface BarChartData {
    name: string;
    count: number;
}
interface AttendanceStatusData {
    name: string;
    value: number;
}

// Dữ liệu giả định
const users = [
    { id: 1, roles: ['teacher'] },
    { id: 2, roles: ['teacher'] },
    { id: 3, roles: ['student'] },
    { id: 4, roles: ['student'] },
    { id: 5, roles: ['student'] },
    { id: 6, roles: ['admin'] },
];
const classes = [
    { id: 1, schoolYear: 2024, semester: 'Học kỳ 1' },
    { id: 2, schoolYear: 2024, semester: 'Học kỳ 2' },
    { id: 3, schoolYear: 2025, semester: 'Học kỳ 1' },
    { id: 4, schoolYear: 2025, semester: 'Học kỳ 1' },
];
const assignments = [
    { id: 1, className: 'Math 101' },
    { id: 2, className: 'Math 101' },
    { id: 3, className: 'Physics 201' },
];
const quizzes = [
    { id: 1, className: 'Math 101' },
    { id: 2, className: 'Physics 201' },
];
const attendances = [
    { status: 'Present' },
    { status: 'Present' },
    { status: 'Absent' },
    { status: 'Late' },
    { status: 'Present' },
];

// Dữ liệu giả định cho các biểu đồ
const userRolesData: PieChartData[] = [
    { name: 'Giáo viên', value: users.filter(u => u.roles.includes('teacher')).length },
    { name: 'Học sinh', value: users.filter(u => u.roles.includes('student')).length },
    { name: 'Admin', value: users.filter(u => u.roles.includes('admin')).length },
];

const assignmentsByClassData: BarChartData[] = [
    { name: 'Math 101', count: assignments.filter(a => a.className === 'Math 101').length },
    { name: 'Physics 201', count: assignments.filter(a => a.className === 'Physics 201').length },
];

const attendanceStatusData: AttendanceStatusData[] = [
    { name: 'Có mặt', value: attendances.filter(a => a.status === 'Present').length },
    { name: 'Vắng', value: attendances.filter(a => a.status === 'Absent').length },
    { name: 'Đi muộn', value: attendances.filter(a => a.status === 'Late').length },
];

const classesPerSemesterData: BarChartData[] = [
    { name: '2024 - HK1', count: classes.filter(c => c.schoolYear === 2024 && c.semester === 'Học kỳ 1').length },
    { name: '2024 - HK2', count: classes.filter(c => c.schoolYear === 2024 && c.semester === 'Học kỳ 2').length },
    { name: '2025 - HK1', count: classes.filter(c => c.schoolYear === 2025 && c.semester === 'Học kỳ 1').length },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardPage: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Title level={2}>Tổng quan hệ thống</Title>

            {/* Top Level Stats Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ textAlign: 'left' }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong>Tổng số người dùng</Text>
                                <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                            </div>
                            <Title level={3} style={{ margin: 0 }}>{users.length}</Title>
                            <Text type="secondary">+20.1% từ tháng trước</Text>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ textAlign: 'left' }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong>Tổng số lớp học</Text>
                                <BookOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                            </div>
                            <Title level={3} style={{ margin: 0 }}>{classes.length}</Title>
                            <Text type="secondary">+5 lớp học mới trong học kỳ này</Text>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ textAlign: 'left' }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong>Tổng số bài tập</Text>
                                <SolutionOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                            </div>
                            <Title level={3} style={{ margin: 0 }}>{assignments.length}</Title>
                            <Text type="secondary">12 bài tập đang chờ xử lý</Text>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ textAlign: 'left' }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong>Tổng số bài kiểm tra</Text>
                                <ClockCircleOutlined style={{ fontSize: '24px', color: '#f5222d' }} />
                            </div>
                            <Title level={3} style={{ margin: 0 }}>{quizzes.length}</Title>
                            <Text type="secondary">5 bài kiểm tra sắp tới</Text>
                        </Space>
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="Phân bổ vai trò người dùng">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={userRolesData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    dataKey="value"
                                    label={({ name, percent }) => {
                                        const percentageValue = typeof percent === 'number' ? (percent * 100).toFixed(0) : '0';
                                        return `${name}: ${percentageValue}%`;
                                    }}
                                >
                                    {userRolesData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Phân bổ bài tập theo lớp">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={assignmentsByClassData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-30} textAnchor="end" height={80} interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Phân bổ trạng thái điểm danh">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={attendanceStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    dataKey="value"
                                    label={({ name, percent }) => {
                                        const percentageValue = typeof percent === 'number' ? (percent * 100).toFixed(0) : '0';
                                        return `${name}: ${percentageValue}%`;
                                    }}
                                >
                                    {attendanceStatusData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Số lớp học theo học kỳ">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={classesPerSemesterData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-30} textAnchor="end" height={80} interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardPage;