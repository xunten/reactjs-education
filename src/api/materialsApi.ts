import apiClient from './apiClient';
import type { ClassMaterial } from '../types';

export const materialsApi = {
  getByClass: async (classId: number): Promise<ClassMaterial[]> => {
    const response = await apiClient.get(`/materials/class/${classId}`);
    return response.data;
  },
};
