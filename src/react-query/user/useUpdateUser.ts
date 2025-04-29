import ApiService from '@/utils/axios';
import { getToken } from '@/utils/jwt';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  async function updateUser(id: number, body: Partial<User>) {
    
    return ApiService.patch(`/service/update/${id}`,body,{ Authorization: `Bearer ${getToken()}` });
  }
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ({ id, body }: { id: number; body: Partial<User> }) => updateUser(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      toast.error(error?.errorData || 'خطا');
    },
  });
}
