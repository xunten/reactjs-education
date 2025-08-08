// src/components/AppLayout.tsx
import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Layout, Menu, theme, Grid, Button, Space, Dropdown, Breadcrumb, Input } from 'antd';
import {
  AppstoreOutlined,
  TeamOutlined,
  ProfileOutlined,
  UserOutlined,
  ClockCircleOutlined,
  AuditOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  BulbOutlined,
  LogoutOutlined,
  BookOutlined, // Đã thêm icon mới
} from '@ant-design/icons';
import { ThemeContext } from './ThemeContext';

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const mainMenuItems = [
  { key: '1', icon: <AppstoreOutlined />, label: 'Dashboard', path: '/' },
  { key: '2', icon: <TeamOutlined />, label: 'Lớp học', path: '/classes' },
  { key: '3', icon: <ProfileOutlined />, label: 'Bài tập', path: '/assignments' },
  { key: '4', icon: <FileTextOutlined />, label: 'Bài đã nộp', path: '/submissions' },
  { key: '5', icon: <ProfileOutlined />, label: 'Bài kiểm tra', path: '/quizzes' },
  { key: '6', icon: <BookOutlined />, label: 'Tài liệu', path: '/materials' }, // Đã thêm mục mới
  { key: '7', icon: <CalendarOutlined />, label: 'Điểm danh', path: '/attendance' },
  { key: '8', icon: <UserOutlined />, label: 'Quản lý User', path: '/users' },
  { key: '9', icon: <ClockCircleOutlined />, label: 'Lịch trình', path: '/schedule' },
  { key: '10', icon: <AuditOutlined />, label: 'Logs', path: '/logs' },
];

const AppLayout: React.FC = () => {
  const { toggleTheme } = React.useContext(ThemeContext);
  const { token: { colorBgContainer } } = theme.useToken();
  const location = useLocation();
  const screens = Grid.useBreakpoint();
  const [collapsed, setCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const getSelectedKey = () => {
    const item = mainMenuItems.find(item => item.path === location.pathname);
    return item ? item.key : '1';
  };
  
  const renderedMenuItems = mainMenuItems.map(item => ({
    ...item,
    label: <Link to={item.path}>{item.label}</Link>
  }));

  const userMenuItems = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/logout">Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );

  const pathnames = location.pathname.split('/').filter(x => x);
  const breadcrumbItems = [
    { title: 'Dashboard', href: '/' },
    ...pathnames.map((value, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      const item = mainMenuItems.find(menuItem => menuItem.path === href);
      return {
        title: item ? item.label : value.charAt(0).toUpperCase() + value.slice(1),
        href,
      };
    }),
  ];

  const handleSearch = (value: string) => {
    console.log('Đang tìm kiếm:', value);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={screens.lg ? !isHovered : collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="80"
        trigger={null}
        onMouseEnter={() => screens.lg && setIsHovered(true)}
        onMouseLeave={() => screens.lg && setIsHovered(false)}
      >
        <div className="logo" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ReadOutlined style={{ fontSize: '32px', color: '#fff' }} />
        </div>
        <Menu theme="dark" selectedKeys={[getSelectedKey()]} mode="inline" items={renderedMenuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space>
            {!screens.lg && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 64, height: 64 }}
              />
            )}
            <Breadcrumb items={breadcrumbItems} />
          </Space>
          <Space>
            <Search
              placeholder="Tìm kiếm..."
              onSearch={handleSearch}
              style={{ width: 200, verticalAlign: 'middle' }}
            />
            <Button onClick={toggleTheme} type="text" icon={<BulbOutlined style={{ fontSize: '18px' }} />} />
            <Dropdown overlay={userMenuItems} placement="bottomRight" arrow>
              <Button type="text" icon={<UserOutlined style={{ fontSize: '18px' }} />} />
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;