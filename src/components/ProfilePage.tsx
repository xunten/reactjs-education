// src/components/ProfilePage.tsx
import React from 'react';
import { Card, Descriptions, Typography, Space, Avatar } from 'antd';
import type { User } from '../types';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Dữ liệu giả định của người dùng hiện tại
const currentUser: User = {
  id: 3,
  username: 'student1',
  fullName: 'Student John',
  email: 'student1@school.edu',
  roles: ['student']
};

const ProfilePage: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Thông tin cá nhân</Title>
      <Card
        title={
          <Space>
            <Avatar size={64} icon={<UserOutlined />} />
            <Title level={3} style={{ margin: 0 }}>{currentUser.fullName}</Title>
          </Space>
        }
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">{currentUser.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{currentUser.email}</Descriptions.Item>
          <Descriptions.Item label="Vai trò">{currentUser.roles.join(', ')}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProfilePage;