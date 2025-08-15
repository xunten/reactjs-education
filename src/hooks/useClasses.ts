import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Class } from '../types'; 
import type { ClassCreateDTO, ClassUpdateDTO } from '../api/classApi'; 
import { 
  fetchClasses, 
  createClass, 
  updateClass, 
  deleteClass, 
} from '../api/classApi'; 

export const useClasses = () => {
  const queryClient = useQueryClient();

  const classesQuery = useQuery<Class[], Error>({
    queryKey: ['classes'], 
    queryFn: fetchClasses, 
    staleTime: 1000 * 60 * 5, 
  });

  const createClassMutation = useMutation<Class, Error, ClassCreateDTO>({
    mutationFn: createClass, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (error) => {
      console.error('Lỗi khi tạo lớp học:', error);
    },
  });

  const updateClassMutation = useMutation<Class, Error, ClassUpdateDTO>({
    mutationFn: updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật lớp học:', error);
    },
  });

  const deleteClassMutation = useMutation<void, Error, number>({
    mutationFn: deleteClass,
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
