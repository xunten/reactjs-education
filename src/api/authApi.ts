import axios from 'axios';
import type { Credentials } from '../types/Auth';

const API_BASE_URL = 'http://localhost:8080/api'; // Đảm bảo URL này đúng

// Định nghĩa kiểu cho User mà frontend sẽ sử dụng
// Lưu ý: role ở đây là một chuỗi duy nhất để tương thích với ProtectedRoute
interface UserProfile {
  id: string;
  username: string;
  email: string; // Thêm email vì nó có trong response
  role: string; // Frontend cần một chuỗi role duy nhất
}

// Định nghĩa kiểu cho phản hồi đăng nhập TỪ BACKEND
interface BackendLoginResponse {
  userId: number; // Backend trả về number
  username: string;
  email: string;
  accessToken: string;
  roles: string[]; // Backend trả về MẢNG các chuỗi role
}

// Định nghĩa kiểu cho phản hồi của hàm login() sau khi đã xử lý
// Đây là kiểu mà LoginPage sẽ nhận được
interface FrontendLoginResponse {
    token: string;
    user: UserProfile; // Sẽ chứa userProfile đã được chuyển đổi
}


export const login = async (credentials: Credentials): Promise<FrontendLoginResponse> => {
  const response = await axios.post<BackendLoginResponse>(`${API_BASE_URL}/auth/login`, credentials);
  const data = response.data;

  // Chuyển đổi phản hồi của backend sang cấu trúc UserProfile của frontend
  const userProfile: UserProfile = {
      id: String(data.userId), // Đảm bảo id là string nếu frontend mong đợi string
      username: data.username,
      email: data.email,
      // Lấy vai trò ĐẦU TIÊN từ mảng roles
      role: data.roles && data.roles.length > 0 ? data.roles[0] : 'user' // Gán 'user' làm mặc định nếu không có vai trò
  };

  return {
      token: data.accessToken,
      user: userProfile
  };
};

// Hàm lấy thông tin user profile vẫn giữ nguyên, nhưng cần đảm bảo
// backend của endpoint /users/me cũng trả về cấu trúc tương tự FrontendLoginResponse.user
// Hoặc bạn phải xử lý lại response của fetchUserProfile tương tự như hàm login.
// Giả sử /users/me cũng trả về userProfile trực tiếp
export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await axios.get<UserProfile>(`${API_BASE_URL}/users/me`, { // Giả sử /users/me trả về thẳng UserProfile
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
