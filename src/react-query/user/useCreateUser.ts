import { PATH_DASHBOARD } from '@/routes/paths';
import { getToken, getTokenInfo, getUserInfo } from '@/utils/jwt';
import { useCounterStore } from '@/zustand/users/counter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';
import { useRouter } from 'next/router';

export function useCreateAccount() {
  console.log('start created', getTokenInfo());
  const { value } = useCounterStore();
  const queryClient = useQueryClient()
  const router = useRouter();
  // getTokenInfo()

  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: async (data: Partial<User>) => {
      // console.log(getTokenInfo());

      const newdata = {
        ...data,
        id: getTokenInfo().id,
        month: value,
      };
      const res = await ApiService.post<User[]>('service/new', newdata, { Authorization: `Bearer ${getToken()}` });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey:['users']
      })
 
      const blob = new Blob([data.server_info], { type: 'conf/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title}${data.service_type=='OPENVPN'?'.ovpn':'.conf'}`; // Specify the filename
    document.body.appendChild(link);

    // Trigger a click event to start the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url)
    router.push(PATH_DASHBOARD.user.list);
    },
  });
}

export function useFindIp() {
  console.log('start find ip ');
  async function fetchIp() {
    const res = await ApiService.get<Ip[]>(
      `server/user/${getTokenInfo().id}`,
      {},
      { Authorization: `Bearer ${getToken()}` }
    );
    return res?.data;
  }
  return useQuery({ queryKey: ['ip'], queryFn: fetchIp });
}
