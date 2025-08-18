import { useQuery } from '@tanstack/react-query';
import activityLogApi from '../api/activityLogApi';
import type { ActivityLog } from '../types';

export const useActivityLogs = () => {
  return useQuery<ActivityLog[], Error>({
    queryKey: ['activityLogs'],
    queryFn: activityLogApi.getAll,
    staleTime: 5 * 60 * 1000, // 
  });
};