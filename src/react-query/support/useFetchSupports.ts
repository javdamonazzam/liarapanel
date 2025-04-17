import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';
import { getToken } from '@/utils/jwt';
import { RoleEnum } from '@/enums/role.enum';

export default function useFetchSupports() {
  async function fetchSupports() {
    // const res = await Axios.get<Support[]>('/support');
    const res = await ApiService.get<Support[]>('user/find', {filter:{role:RoleEnum.USER}},{ Authorization: `Bearer ${getToken()}` });
    return res.data;
  }
  return useQuery({ queryKey: ['supports'], queryFn: fetchSupports });
}
