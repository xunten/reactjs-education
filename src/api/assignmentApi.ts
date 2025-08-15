import axios from 'axios';
import type { Assignment } from '../types/Assignment';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchAssignments = async (): Promise<Assignment[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
  }

  try {
    const response = await axios.get<Assignment[]>(`${API_BASE_URL}/assignments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài tập:', error);
    throw error;
  }
};
