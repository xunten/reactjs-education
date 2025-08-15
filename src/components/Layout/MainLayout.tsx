import React, { useCallback, useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  // Desktop mặc định mở; mobile sẽ auto collapse khi breakpoint "lg" kích hoạt
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => setCollapsed((c) => !c), []);
  const handleBreakpoint = useCallback((broken: boolean) => {
    // Khi xuống < lg, tự thu gọn; khi lên >= lg mở lại
    setCollapsed(broken);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} onBreakpoint={handleBreakpoint} />
      <Layout>
        <AppHeader collapsed={collapsed} onToggle={toggleSidebar} />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
