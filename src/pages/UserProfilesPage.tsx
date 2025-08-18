// src/pages/UserProfilesPage.tsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Avatar, Spin, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import apiClient from '../api/apiClient';
import type { User } from '../types/User';

const { Title } = Typography;

const UserProfilesPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get<User[]>('/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách người dùng:', error);
        message.error('Không thể tải danh sách người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Danh sách người dùng</Title>
      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar size={48} icon={<UserOutlined />} />
                  <span>{user.fullName}</span>
                </div>
              }
            >
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Vai trò:</strong> {user.roles.join(', ')}</p>
              <p><strong>Trạng thái:</strong> {user.isActive ? 'Hoạt động' : 'Không hoạt động'}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserProfilesPage;
