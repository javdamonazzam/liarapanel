import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';
import { getToken } from '@/utils/jwt';
import ApiService from '@utils/axios.ts';

export default function useFetchSingleProduct(id: number) {
  async function fetchSingleProduct() {
    const res = await ApiService.get(`/server/${id}`, {}, { Authorization: `Bearer ${getToken()}` });
    return res.data;
  }
  return useQuery({ queryKey: ['product', id], queryFn: fetchSingleProduct });
}
