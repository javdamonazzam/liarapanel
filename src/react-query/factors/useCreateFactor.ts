// package
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
// module
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import ApiService from '@utils/axios.ts';
import { getToken } from '@/utils/jwt';

export default function useCreateFactor() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function createOrder(data: Partial<Factor>) {
    console.log(data);
    const res = await ApiService.post<Factor[]>('invoice/new', data, { Authorization: `Bearer ${getToken()}` });
    console.log(res,"response");
    
    return res.data;
  }
  return useMutation({
    mutationKey: ['factor'],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factors'] });
      router.push(PATH_DASHBOARD.invoice.list);
      toast.success('فاکتور با موفقیت ایجاد شد');
    },
  });
}
