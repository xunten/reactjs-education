import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  TeamOutlined,
  ProfileOutlined,
  UserOutlined,
  ClockCircleOutlined,
  AuditOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ReadOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void; // (dùng ở Header)
  onBreakpoint?: (broken: boolean) => void;
};

const mainMenuItems = [
  { key: "1", icon: <AppstoreOutlined />, label: "Dashboard", path: "/dashboard" },
  { key: "2", icon: <TeamOutlined />, label: "Lớp học", path: "/classes" },
  { key: "3", icon: <ProfileOutlined />, label: "Bài tập", path: "/assignments" },
  { key: "4", icon: <FileTextOutlined />, label: "Bài đã nộp", path: "/submissions" },
  { key: "5", icon: <ProfileOutlined />, label: "Bài kiểm tra", path: "/quizzes" },
  { key: "6", icon: <BookOutlined />, label: "Tài liệu", path: "/materials" },
  { key: "7", icon: <CalendarOutlined />, label: "Điểm danh", path: "/attendance" },
  { key: "8", icon: <UserOutlined />, label: "Quản lý User", path: "/users" },
  { key: "9", icon: <ClockCircleOutlined />, label: "Thời Khóa biểu", path: "/schedule" },
  { key: "10", icon: <AuditOutlined />, label: "Logs", path: "/logs" },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onBreakpoint }) => {
  const location = useLocation();

  const selectedKey = useMemo(() => {
    const currentPath = location.pathname === "/" ? "/dashboard" : location.pathname;
    const item = mainMenuItems.find((i) => i.path === currentPath);
    return item ? item.key : "1";
  }, [location.pathname]);

  const renderedMenuItems = useMemo(
    () =>
      mainMenuItems.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: <Link to={item.path}>{item.label}</Link> as React.ReactNode,
      })),
    []
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      // trigger để null vì ta có nút toggle riêng ở Header
      trigger={null}
      breakpoint="lg"
      collapsedWidth={80}
      onBreakpoint={onBreakpoint}
      style={{ position: "sticky", top: 0, height: "100vh" }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        <ReadOutlined style={{ fontSize: 28, marginRight: collapsed ? 0 : 8 }} />
        {!collapsed && "Admin"}
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={renderedMenuItems} />
    </Sider>
  );
};

export default Sidebar;
