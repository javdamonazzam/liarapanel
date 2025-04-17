import { useRouter } from 'next/router';
import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';
import useFilterUser from '@/zustand/users/useFilterUser.ts';
import { useShallow } from 'zustand/react/shallow';
import useUsersPagination from '@/zustand/users/useUsersPagination.ts';
import useUsersTabState from '@/zustand/users/useUserSetTab.ts';
import { getToken } from '@utils/jwt.ts';
import ApiService from '@utils/axios.ts';

export function useFetchFactor() {
  console.log("start find factor ")
  async function fetchFactors() {
    const res = await ApiService.get<Factor[]>('invoice/find', {}, { Authorization: `Bearer ${getToken()}` });
    return res.data;
  }
  return useQuery({ queryKey: ['factor'], queryFn: fetchFactors });
}

export default function useFetchSeler() {
  console.log('start featch seller');
  const router = useRouter();
  const { id } = router.query;
  const { take, page, setTotal } = useUsersPagination(
    useShallow((state) => ({
      setTotal: state.setTotal,
      page: state.activePage,
      take: state.rowPerPage,
    }))
  );
  const activeTab = useUsersTabState((state) => state.activeTab);
  const full_name = useFilterUser((state) => state.fullName);
  const role = useFilterUser((state) => state.role);
  async function fetchSeler() {
    const res = await ApiService.get<User[]>('user/find', {}, { Authorization: `Bearer ${getToken()}` });

    return res.data;
  }
  return useQuery({
    queryKey: ['seler', { id, activeTab, page, role, full_name, take }],
    queryFn: fetchSeler,
  });
}
