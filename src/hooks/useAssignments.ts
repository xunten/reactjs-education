/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useAssignments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import assignmentApi from '../api/assignmentApi';
import type { Assignment, AssignmentCreateDTO, AssignmentUpdateDTO } from '../types';

export const useAssignments = () => {
  const queryClient = useQueryClient();

  // Query lấy danh sách bài tập
  const assignmentsQuery = useQuery<Assignment[], Error>({
    queryKey: ['assignments'],
    queryFn: assignmentApi.getAll,
    staleTime: 1000 * 60 * 5,
  });

  // Mutation thêm bài tập
  const createAssignmentMutation = useMutation<Assignment, Error, AssignmentCreateDTO>({
    mutationFn: assignmentApi.create,
    onSuccess: () => {
      message.success('Thêm bài tập thành công');
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
    onError: (err: any) => {
      message.error(err.message || 'Thêm bài tập thất bại');
    },
  });

  // Mutation cập nhật bài tập
  const updateAssignmentMutation = useMutation<Assignment, Error, { id: number; data: AssignmentUpdateDTO }>({
    mutationFn: ({ id, data }) => assignmentApi.update(id, data),
    onSuccess: () => {
      message.success('Cập nhật bài tập thành công');
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
    onError: (err: any) => {
      message.error(err.message || 'Cập nhật bài tập thất bại');
    },
  });

  // Mutation xóa bài tập
  const deleteAssignmentMutation = useMutation<void, Error, number>({
    mutationFn: assignmentApi.remove,
    onSuccess: () => {
      message.success('Xóa bài tập thành công');
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
    onError: (err: any) => {
      message.error(err.message || 'Xóa bài tập thất bại');
    },
  });

return {
  assignments: assignmentsQuery.data || [],
  isLoading: assignmentsQuery.isLoading,
  error: assignmentsQuery.error,

  createAssignment: createAssignmentMutation.mutateAsync,
  updateAssignment: updateAssignmentMutation.mutateAsync,
  deleteAssignment: deleteAssignmentMutation.mutateAsync,

  isCreating: createAssignmentMutation.isPending,
  isUpdating: updateAssignmentMutation.isPending,
  isDeleting: deleteAssignmentMutation.isPending,
};

};
