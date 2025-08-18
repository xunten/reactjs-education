import apiClient from './apiClient';
import type { Attendance } from '../types/Attendance';

const BASE_URL = '/attendances';

const attendanceApi = {
  getAll: async (): Promise<Attendance[]> => {
    const response = await apiClient.get<Attendance[]>(BASE_URL);
    return response.data;
  },

  getByScheduleId: async (scheduleId: number): Promise<Attendance[]> => {
    const response = await apiClient.get<Attendance[]>(`${BASE_URL}/class-schedule/${scheduleId}`);
    return response.data;
  },

  create: async (data: Partial<Attendance>): Promise<Attendance> => {
    const response = await apiClient.post<Attendance>(BASE_URL, data);
    return response.data;
  },

  updateStatus: async (id: number, status: Attendance['status']): Promise<Attendance> => {
    const response = await apiClient.patch<Attendance>(`${BASE_URL}/${id}`, { status });
    return response.data;
  },

  getAllWithFilters: async (
    classId?: number,
    studentId?: number,
    scheduleId?: number
  ): Promise<Attendance[]> => {
    const params = new URLSearchParams();
    if (classId !== undefined) params.append('classId', String(classId));
    if (studentId !== undefined) params.append('studentId', String(studentId));
    if (scheduleId !== undefined) params.append('scheduleId', String(scheduleId));

    const queryString = params.toString();
    const url = `${BASE_URL}${queryString ? `?${queryString}` : ''}`;
    const response = await apiClient.get<Attendance[]>(url);
    return response.data;
  },
};

export default attendanceApi;
