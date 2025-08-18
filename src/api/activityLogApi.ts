import apiClient from './apiClient';
import type { ActivityLog } from '../types';

const BASE_URL = '/activity-logs';

const activityLogApi = {
  getAll: async (): Promise<ActivityLog[]> => {
    try {
      const response = await apiClient.get<ActivityLog[]>(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy nhật ký hoạt động:', error);
      throw error;
    }
  },
};

export default activityLogApi;
