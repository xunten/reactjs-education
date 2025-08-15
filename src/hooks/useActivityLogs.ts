import { useQuery } from '@tanstack/react-query';
import { fetchActivityLogs, type ActivityLog } from '../api/activityLogApi'; 


export const useActivityLogs = () => {
  return useQuery<ActivityLog[], Error>({
    queryKey: ['activityLogs'],
    queryFn: fetchActivityLogs,
    staleTime: 1000 * 60 * 5, 
  
  });
};
