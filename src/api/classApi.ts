import axios from 'axios';
// QUAN TRỌNG: Import interface Class từ file types của bạn
import type { Class } from '../types'; 

const API_BASE_URL = 'http://localhost:8080/api'; 

export type ClassCreateDTO = Omit<Class, 'id' | 'teacherName'>;

export type ClassUpdateDTO = Class;

export const fetchClasses = async (): Promise<Class[]> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Không tìm thấy token xác thực.');

  // <-- ĐÃ SỬA: Thay đổi đường dẫn thành "/auth/classes"
  const response = await axios.get<Class[]>(`${API_BASE_URL}/auth/classes`, { 
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createClass = async (newClass: ClassCreateDTO): Promise<Class> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Không tìm thấy token xác thực.');

  const response = await axios.post<Class>(`${API_BASE_URL}/classes`, newClass, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateClass = async (updatedClass: ClassUpdateDTO): Promise<Class> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Không tìm thấy token xác thực.');

  const response = await axios.put<Class>(`${API_BASE_URL}/classes/${updatedClass.id}`, updatedClass, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteClass = async (id: number): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Không tìm thấy token xác thực.');

  await axios.delete(`${API_BASE_URL}/classes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
