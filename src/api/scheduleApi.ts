import apiClient from './apiClient';
import type { SchedulePattern, SchedulePatternCreateDTO, SchedulePatternUpdateDTO } from '../types/Schedule';

const BASE_URL = '/auth/class-schedule-patterns';

const scheduleApi = {
  getAllByClass: async (classId: number): Promise<SchedulePattern[]> => {
    const response = await apiClient.get<SchedulePattern[]>(`${BASE_URL}/class/${classId}`);
    return response.data;
  },
  getSessionsByClass: (classId: number) =>
  apiClient.get(`/sessions/class/${classId}`).then(res => res.data),


  createBatch: async (classId: number, data: SchedulePatternCreateDTO[]): Promise<SchedulePattern[]> => {
    const response = await apiClient.post<SchedulePattern[]>(BASE_URL, { classId, patterns: data });
    return response.data;
  },

  updateBatch: async (data: SchedulePatternUpdateDTO): Promise<SchedulePattern[]> => {
    const response = await apiClient.put<SchedulePattern[]>(`${BASE_URL}/batch`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};

export default scheduleApi;
