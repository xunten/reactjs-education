import apiClient from './apiClient';
import type { ClassMaterial } from '../types';
import type { AxiosResponse } from 'axios';

export const materialsApi = {
  // Lấy tất cả tài liệu
  getAll: async (): Promise<ClassMaterial[]> => {
    const response: AxiosResponse<ClassMaterial[]> = await apiClient.get('/materials');
    return response.data;
  },

  // Lấy tài liệu theo classId
  getByClass: async (classId: number): Promise<ClassMaterial[]> => {
    const response: AxiosResponse<ClassMaterial[]> = await apiClient.get(`/materials/class/${classId}`);
    return response.data;
  },

  // Lấy chi tiết 1 tài liệu
  getById: async (id: number): Promise<ClassMaterial> => {
    const response: AxiosResponse<ClassMaterial> = await apiClient.get(`/materials/${id}`);
    return response.data;
  },

  // Tải xuống tài liệu theo id
  download: async (id: number): Promise<Blob> => {
    const response = await apiClient.get(`/materials/download/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Tạo tài liệu mới (upload file)
  create: async (formData: FormData): Promise<ClassMaterial> => {
    const response: AxiosResponse<ClassMaterial> = await apiClient.post('/materials', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Cập nhật tài liệu (có thể là metadata hoặc re-upload file)
  update: async (id: number, formData: FormData): Promise<ClassMaterial> => {
    const response: AxiosResponse<ClassMaterial> = await apiClient.put(`/materials/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Xóa tài liệu
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/materials/${id}`);
  },
};
