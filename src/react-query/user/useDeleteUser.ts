import ApiService from '@/utils/axios';
import { getToken } from '@/utils/jwt';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  function deleteUser(id: number) {
    return ApiService.delete(`/service/${id}`,{ Authorization: `Bearer ${getToken()}` });
  }
  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await queryClient.invalidateQueries({ queryKey: ['pharmacyUsers'] });
    },
    onError: (error) => {
      toast.error(error?.errorData || 'خطا');
    },
  });
}
