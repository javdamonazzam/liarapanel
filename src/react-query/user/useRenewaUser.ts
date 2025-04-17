import ApiService from '@/utils/axios';
import { getToken } from '@/utils/jwt';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function useRenewaUser() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function renewaUser(id: number) {
    const res = await ApiService.patch(`/service/${id}`,{},  { Authorization: `Bearer ${getToken()}` });
    return res.data
  }
  return useMutation({
    mutationKey: ['renewaUser'],
    mutationFn: (id: number) => renewaUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['renewa'] });
      await queryClient.invalidateQueries({ queryKey: ['renewaUser'] });
      router.push('/dashboard/user/list/');
    },
    onError: (error) => {
      toast.error(error?.errorData || 'خطا');
    },
  });
}
