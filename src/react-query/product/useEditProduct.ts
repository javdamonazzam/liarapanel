import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import ApiService from '@utils/axios.ts';
import { getToken } from '@/utils/jwt';

export default  function useEditProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();
  async function editProduct(id: number, data: Partial<Product>) {
    const res = await ApiService.patch(`/server/${id}`, data, { Authorization: `Bearer ${getToken()}` });
    return res.data;
  }

  return useMutation({
    mutationKey: ['product'],
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) => editProduct(id, data),
    onSuccess: () => {
      toast.success('سرور با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push(PATH_DASHBOARD.product.list);
    },
  });
}
