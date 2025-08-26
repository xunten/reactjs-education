import apiClient from "./apiClient";
import type { Assignment } from "../types/Assignment";

const BASE_URL = "/assignments";

export type CreateAssignmentPayload = Partial<Assignment>;
export type UpdateAssignmentPayload = Partial<Assignment>;

const assignmentsApi = {
  getAll: async (): Promise<Assignment[]> => {
    const { data } = await apiClient.get<Assignment[]>(BASE_URL);
    return data;
  },

  getById: async (id: number): Promise<Assignment> => {
    const { data } = await apiClient.get<Assignment>(`${BASE_URL}/${id}`);
    return data;
  },

  create: async (payload: CreateAssignmentPayload): Promise<Assignment> => {
    const { data } = await apiClient.post<Assignment>(BASE_URL, payload);
    return data;
  },

  update: async (id: number, payload: UpdateAssignmentPayload): Promise<Assignment> => {
    const { data } = await apiClient.patch<Assignment>(`${BASE_URL}/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};

export default assignmentsApi;
