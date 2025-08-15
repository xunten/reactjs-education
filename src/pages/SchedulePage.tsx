import React from 'react';
import { Card, Typography, Button, Space, Row, Col, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ScheduleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { Schedule } from '../types';

const { Title, Text } = Typography;
const { Search } = Input;

const schedules: Schedule[] = [
  { id: 1, classId:1, className: 'Math 101', startTime: new Date('2025-08-07T08:00:00Z'), endTime: new Date('2025-08-07T09:30:00Z'), dayOfWeek: 'Thứ Năm' },
  { id: 2, classId:2, className: 'Lớp 12A1', startTime: new Date('2025-08-07T10:00:00Z'), endTime: new Date('2025-08-07T11:30:00Z'), dayOfWeek: 'Thứ Năm' },
  { id: 3, classId:1, className: 'Văn học', startTime: new Date('2025-08-08T13:00:00Z'), endTime: new Date('2025-08-08T14:30:00Z'), dayOfWeek: 'Thứ Sáu' },
];

const SchedulePage: React.FC = () => {
  const totalSchedules = schedules.length;
  const today = new Date();
  const todaySchedules = schedules.filter(
    s => new Date(s.startTime).toLocaleDateString() === today.toLocaleDateString()
  ).length;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Thời khóa biểu</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Space align="center">
              <ScheduleOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
              <div>
                <Text type="secondary">Tổng số lịch trình</Text>
                <Title level={3} style={{ margin: 0 }}>{totalSchedules}</Title>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Space align="center">
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              <div>
                <Text type="secondary">Lịch trình hôm nay</Text>
                <Title level={3} style={{ margin: 0 }}>{todaySchedules}</Title>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card
        title={<Text strong>Danh sách Lịch trình</Text>}
        extra={<Button icon={<PlusOutlined />}>Thêm lịch trình mới</Button>}
        style={{ marginBottom: 16 }}
      >
        <Search placeholder="Tìm kiếm lịch trình..." style={{ width: 300, marginBottom: 16 }} />
        <Row gutter={[16, 16]}>
          {schedules.map(schedule => (
            <Col xs={24} sm={12} md={8} key={schedule.id}>
              <Card
                title={schedule.className}
                extra={
                  <Space>
                    <Button icon={<EditOutlined />} size="small" />
                    <Button icon={<DeleteOutlined />} size="small" danger />
                  </Space>
                }
              >
                <p><Text strong>Ngày:</Text> {schedule.dayOfWeek}</p>
                <p>
                  <Text strong>Thời gian:</Text>{' '}
                  {new Date(schedule.startTime).toLocaleTimeString()} - {new Date(schedule.endTime).toLocaleTimeString()}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default SchedulePage;
