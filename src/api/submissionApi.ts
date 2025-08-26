import apiClient from "./apiClient";
import type { Submission } from "../types/Submission";

const submissionApi = {
  getAll: async (): Promise<Submission[]> => {
    const { data } = await apiClient.get("/submissions");
    return data;
  },
  delete: async (id: number) => {
    const { data } = await apiClient.delete(`/submissions/${id}`);
    return data;
  },
};

export default submissionApi;
