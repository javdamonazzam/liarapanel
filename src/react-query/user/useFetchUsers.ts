import ApiService from '@/utils/axios';
import useUsersTabState from '@/zustand/users/useUserSetTab';
import useUsersPagination from '@/zustand/users/useUsersPagination';
import { useQuery } from '@tanstack/react-query';
import useFilterUser from '@/zustand/users/useFilterUser.ts';
import { useShallow } from 'zustand/react/shallow';
import { getToken, getTokenInfo } from '@utils/jwt.ts';
import { useWalletStore } from '@/zustand/users/wallet';

export default function useFetchUsers() {
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
  async function fetchUsers() {
    console.log("start service <<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    
    const res = await ApiService.get<User[]>(
      'service/find',
      { filter: { user_id: getTokenInfo().id } },
      { Authorization: `Bearer ${getToken()}` }
    );
    
    console.log(res.data,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    setTotal(res.data.pagination.lastPage);
    
    return res.data;
  }
  return useQuery({ queryKey: ['users', { activeTab, page, role, full_name, take }], queryFn: fetchUsers });
}
export function useFetchWallet() {
  const {setBalance}=useWalletStore()
  async function fetchWallet() {

    const res = await ApiService.get<Wallet>(
      `wallet/user/${getTokenInfo().id}`,
      {},
      { Authorization: `Bearer ${getToken()}` }
    );
    setBalance(res.data.wallet_balance)
    return res.data;
  }
  return useQuery({ queryKey: ['wallet'], queryFn: fetchWallet });
}
