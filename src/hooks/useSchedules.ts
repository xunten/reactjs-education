import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import scheduleApi from '../api/scheduleApi';
import type { SchedulePattern, SchedulePatternCreateDTO, SchedulePatternUpdateDTO } from '../types/Schedule';

export const useSchedules = (classId?: number) => {
  const queryClient = useQueryClient();

  const schedulesQuery = useQuery<SchedulePattern[], Error>({
    queryKey: ['schedules', classId],
    queryFn: async () => {
      if (!classId) return [];
      return scheduleApi.getAllByClass(classId);
    },
    enabled: !!classId,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (data: SchedulePatternCreateDTO[]) => {
      if (!classId) throw new Error('classId required');
      return scheduleApi.createBatch(classId, data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules', classId] }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: SchedulePatternUpdateDTO) => scheduleApi.updateBatch(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules', classId] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => scheduleApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['schedules', classId] }),
  });

  return {
    schedules: schedulesQuery.data || [],
    isLoading: schedulesQuery.isLoading,
    isError: schedulesQuery.isError,
    createSchedules: createMutation.mutateAsync,
    updateSchedules: updateMutation.mutateAsync,
    deleteSchedule: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
