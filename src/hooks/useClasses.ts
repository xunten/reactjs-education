// useClasses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Class } from '../types'; 
import type { ClassCreateDTO, ClassUpdateDTO } from '../api/classApi'; 
import classApi from '../api/classApi';

export const useClasses = () => {
  const queryClient = useQueryClient();

  const classesQuery = useQuery<Class[], Error>({
    queryKey: ['classes'], 
    queryFn: classApi.getAll,    
    staleTime: 1000 * 60 * 5, 
  });

  const createClassMutation = useMutation<Class, Error, ClassCreateDTO>({
    mutationFn: classApi.create, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (error) => {
      console.error('Lỗi khi tạo lớp học:', error);
    },
  });

  const updateClassMutation = useMutation<Class, Error, ClassUpdateDTO>({
    mutationFn: classApi.update, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật lớp học:', error);
    },
  });

  const deleteClassMutation = useMutation<void, Error, number>({
    mutationFn: classApi.delete, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (error) => {
      console.error('Lỗi khi xóa lớp học:', error);
    },
  });

  return {
    classes: classesQuery.data,
    isLoading: classesQuery.isLoading,
    error: classesQuery.error,
    createClass: createClassMutation.mutateAsync, 
    updateClass: updateClassMutation.mutateAsync,
    deleteClass: deleteClassMutation.mutateAsync,
    isCreating: createClassMutation.isPending,
    isUpdating: updateClassMutation.isPending,
    isDeleting: deleteClassMutation.isPending,
  };
};
