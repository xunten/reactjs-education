import axios from 'axios';
import type { ActivityLog } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';


export const fetchActivityLogs = async (): Promise<ActivityLog[]> => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
  }

  try {
    const response = await axios.get<ActivityLog[]>(`${API_BASE_URL}/activity-logs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy nhật ký hoạt động:', error);
    throw error;
  }
};
