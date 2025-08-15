import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { fetchUserProfile } from '../api/authApi';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    const initializeAuth = async () => {
      console.log('AuthContext: Bắt đầu khởi tạo...');
      if (token) {
        setIsLoggedIn(true); 
        let currentUser: User | null = null;

        if (storedUser) {
          try {
            const parsedUser: User = JSON.parse(storedUser);
            if (parsedUser.id && parsedUser.username && parsedUser.email && parsedUser.role) {
                currentUser = parsedUser;
                console.log('AuthContext: Đã tìm thấy user trong localStorage:', currentUser);
            } else {
                console.warn("AuthContext: User data trong localStorage không đầy đủ. Sẽ thử fetch từ API.");
                localStorage.removeItem('user'); 
            }
          } catch (e) {
            console.error("AuthContext: Lỗi khi phân tích thông tin user từ localStorage:", e);
            localStorage.removeItem('user');
          }
        }

        if (!currentUser) { 
          console.warn("AuthContext: Cần lấy thông tin user chi tiết từ API.");
          try {
            const fetchedUser = await fetchUserProfile(token);
            currentUser = fetchedUser;
            localStorage.setItem('user', JSON.stringify(fetchedUser));
            console.log('AuthContext: Đã lấy user từ API:', currentUser);
          } catch (fetchError) {
            console.error("AuthContext: Không thể lấy thông tin user từ API, xóa token:", fetchError);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            currentUser = null;
          }
        }
        setUser(currentUser);
      } else {
        console.log('AuthContext: Không tìm thấy token trong localStorage.');
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoadingAuth(false);
      console.log('AuthContext: Kết thúc khởi tạo.');
    };

    initializeAuth();
  }, []);

  const login = useCallback((token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    console.log('AuthContext: Đã gọi login, trạng thái user hiện tại:', userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token'); // <-- Đảm bảo dòng này
    localStorage.removeItem('user');  // <-- Đảm bảo dòng này
    setIsLoggedIn(false);
    setUser(null);
    console.log('AuthContext: Đã đăng xuất.');
  }, []);

  if (loadingAuth) {
    return <div>Đang tải thông tin xác thực...</div>;
  }

  const contextValue = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
