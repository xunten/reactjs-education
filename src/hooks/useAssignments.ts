import { useQuery } from '@tanstack/react-query';
import { fetchAssignments } from '../api/assignmentApi'; 
import type { Assignment } from '../types';

export const useAssignments = () => {
  return useQuery<Assignment[], Error>({
    queryKey: ['assignments'], 
    queryFn: fetchAssignments, 
    staleTime: 1000 * 60 * 5, 
  });
};
