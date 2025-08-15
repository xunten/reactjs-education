/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchUsers = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/users`);
  return data;
};

export const createUser = async (userData: any) => {
  const { data } = await axios.post(`${API_BASE_URL}/users`, userData);
  return data;
};

export const updateUser = async (userId: number, userData: any) => {
  const { data } = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
  return data;
};

export const deleteUser = async (userId: number) => {
  const { data } = await axios.delete(`${API_BASE_URL}/users/${userId}`);
  return data;
};