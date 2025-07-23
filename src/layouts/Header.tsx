
import {
  HomeOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router';
import { Dropdown, Avatar, Space } from 'antd';

const menuItems = [
  { key: 'home', label: 'Trang chủ', icon: <HomeOutlined /> },
  { key: 'class', label: 'Quản lý lớp', icon: <AppstoreOutlined /> },
  { key: 'exam', label: 'Quản lý đề thi', icon: <FileTextOutlined /> },
  { key: 'teacher', label: 'Quản lý giáo viên', icon: <TeamOutlined /> },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Xoá token, điều hướng login
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const profileMenu = [
    {
      key: 'profile',
      label: <span>Thông tin cá nhân</span>,
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: <span>Đăng xuất</span>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">Quản lý học tập</div>

        {/* Navigation */}
        <nav className="flex space-x-6">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.key);
            return (
              <Link
                key={item.key}
                to={`/${item.key}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 
                  ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'}
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Dropdown */}
        <Dropdown
          menu={{ items: profileMenu, onClick: handleMenuClick }}
          trigger={['click']}
        >
          <Space className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition-all">
            <Avatar size="small" src="https://i.pravatar.cc/300" />
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </Space>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
