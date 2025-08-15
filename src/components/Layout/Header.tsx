import React, { useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Space, Button, Dropdown, Breadcrumb, Input, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, BulbOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { ThemeContext } from '../ThemeContext';
import { useAuth } from '../../context/AuthContext'; 

const { Header: AntHeader } = Layout;
const { Search } = Input;

type AppHeaderProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, onToggle }) => {
  const { token: { colorBgContainer } } = theme.useToken();
  const { toggleTheme } = React.useContext(ThemeContext);
  const { logout } = useAuth();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = useMemo(() => {
    const items: { title: React.ReactNode }[] = [{ title: <Link to="/dashboard">Dashboard</Link> }];
    pathnames.forEach((value, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      items.push({ title: <Link to={href}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link> });
    });
    return items;
  }, [pathnames]);

  const handleSearch = useCallback((v: string) => {
    console.log("Đang tìm kiếm:", v);
  }, []);

  const userDropdownMenuItems = useMemo(
    () => [
      { key: "profile", icon: <UserOutlined />, label: <Link to="/profile">Thông tin cá nhân</Link> },
      { key: "logout", icon: <LogoutOutlined />, label: "Đăng xuất", onClick: () => logout() },
    ],
    [logout]
  );

  return (
    <AntHeader
      style={{
        padding: "0 16px",
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Space align="center">
        <Button
          type="text"
          onClick={onToggle}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{ fontSize: 16 }}
          aria-label="Toggle sidebar"
        />
        <Breadcrumb items={breadcrumbItems} />
      </Space>

      <Space size="middle" align="center">
        <Search
          placeholder="Tìm kiếm..."
          onSearch={handleSearch}
          allowClear
          style={{ width: 240, verticalAlign: "middle" }}
        />
        <Button type="text" onClick={toggleTheme} icon={<BulbOutlined style={{ fontSize: 18 }} />} />
        <Dropdown menu={{ items: userDropdownMenuItems }} placement="bottomRight" arrow>
          <Button type="text" icon={<UserOutlined style={{ fontSize: 18 }} />} />
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default AppHeader;
