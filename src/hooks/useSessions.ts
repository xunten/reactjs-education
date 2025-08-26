import { useQuery } from '@tanstack/react-query';
import scheduleApi from '../api/scheduleApi';
import type { ScheduleSession } from '../types/Schedule';

export const useSessions = (classId?: number) => {
  return useQuery<ScheduleSession[], Error>({
    queryKey: ['sessions', classId],
    queryFn: async () => {
      if (!classId) return []; // luôn trả về array, không trả về undefined
      const res = await scheduleApi.getSessionsByClass(classId);
      return res;
    },
    enabled: !!classId, // chỉ chạy query khi classId có giá trị
  });
};
