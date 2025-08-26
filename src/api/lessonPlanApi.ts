import apiClient from './apiClient';
import type { LessonPlan } from '../types';

const BASE_URL = '/api/auth/lesson-plans';

const lessonPlanApi = {
  getAll: async (): Promise<LessonPlan[]> => {
    const res = await apiClient.get<LessonPlan[]>(BASE_URL);
    return res.data;
  },

  getById: async (id: number): Promise<LessonPlan> => {
    const res = await apiClient.get<LessonPlan>(`${BASE_URL}/${id}`);
    return res.data;
  },

  getLessonPlansByClass: async (classId: number): Promise<LessonPlan[]> => {
    const res = await apiClient.get<LessonPlan[]>(`${BASE_URL}/class/${classId}`);
    return res.data;
  },

  create: async (data: Omit<LessonPlan, 'id'>): Promise<LessonPlan> => {
    const res = await apiClient.post(BASE_URL, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Omit<LessonPlan, 'id'>>): Promise<LessonPlan> => {
    const res = await apiClient.put(`${BASE_URL}/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },

  importLessonPlans: async (classId: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post(`${BASE_URL}/import/${classId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

export default lessonPlanApi;
