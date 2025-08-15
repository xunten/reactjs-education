// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import type { User } from '../types';

// Hook lấy danh sách người dùng
export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // Giữ data trong cache 5 phút
  });
};

// Hook tạo người dùng mới (Optimistic Update)
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, Partial<User>>({
    mutationFn: createUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      const tempId = Date.now(); // ID tạm
      queryClient.setQueryData<User[]>(['users'], (old) => [
        ...(old || []),
        { id: tempId, ...newUser } as User,
      ]);
      return { previousUsers };
    },
    onError: (err, _, context) => {
      const ctx = context as { previousUsers?: User[] } | undefined;
      queryClient.setQueryData(['users'], ctx?.previousUsers);  
      message.error(err.message || 'Tạo người dùng thất bại');
    },
    onSuccess: () => {
      message.success('Tạo người dùng thành công');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Hook xóa người dùng (Optimistic Update)
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      queryClient.setQueryData<User[]>(['users'], (old) =>
        old?.filter((user) => user.id !== userId) || []
      );
      return { previousUsers };
    },
    onError: (err, _, context) => {
      const ctx = context as { previousUsers?: User[] } | undefined;
      queryClient.setQueryData(['users'], ctx?.previousUsers);
      message.error(err.message || 'Xóa người dùng thất bại');
    },
    onSuccess: () => {
      message.success('Xóa người dùng thành công');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Hook cập nhật người dùng (Optimistic Update)
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, { userId: number; userData: Partial<User> }>({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
    onMutate: async ({ userId, userData }) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<User[]>(['users']);
      queryClient.setQueryData<User[]>(['users'], (old) =>
        old?.map((user) =>
          user.id === userId ? { ...user, ...userData } : user
        ) || []
      );
      return { previousUsers };
    },
    onError: (err, _, context) => {
      const ctx = context as { previousUsers?: User[] } | undefined;
      queryClient.setQueryData(['users'], ctx?.previousUsers);
      message.error(err.message || 'Cập nhật người dùng thất bại');
    },
    onSuccess: () => {
      message.success('Cập nhật người dùng thành công');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
