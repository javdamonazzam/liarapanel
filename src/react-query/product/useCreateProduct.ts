import Axios from '@utils/axios.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PATH_DASHBOARD } from '@routes/paths.tsx';
import { useRouter } from 'next/router';
import ApiService from '@utils/axios.ts';
import { getToken } from '@/utils/jwt';

export default function useCreateServer() {
  console.log('start create server');
 
  const router = useRouter();
  const queryClient = useQueryClient();
  async function createServer(body: any ) {
    console.log(body ,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<body" )
    const res = await ApiService.post<Product>('server/new',body, { Authorization: `Bearer ${getToken()}` });
    console.log(res.data,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<res data created server");
    
    return res.data;
  }
  return useMutation({
    mutationKey: ['server'],
    mutationFn: createServer,
    onSuccess: () => {
      toast.success('سرور با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['server'] });
      router.push(PATH_DASHBOARD.product.list);
    },
  });
}
