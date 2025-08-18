import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { materialsApi } from '../api/materialsApi';
import type { ClassMaterial } from '../types';

export const useMaterialsByClass = (classId: number) => {
  return useQuery<ClassMaterial[], Error>({
    queryKey: ['materials', classId],
    queryFn: async () => {
      try {
        const res = await materialsApi.getByClass(classId); // gọi /materials/class/{classId}
        return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        message.error('Lỗi khi lấy danh sách tài liệu: ' + (err.response?.data?.message || err.message));
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
