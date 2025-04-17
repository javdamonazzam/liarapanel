import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';
import axios from '@utils/axios.ts';
import { setSession } from '@utils/jwt.ts';
import { useRouter } from 'next/router';

export default function useLoginMutation() {
  return useMutation({
    mutationKey: ['auth_login'],
    mutationFn: (loginDto: LoginDto) => axios.post('auth/login-step-one', loginDto),
  });
}
export function useLoginStepTwoMutation() {
  
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ['auth_login_step_two'],
    mutationFn: async (loginDto: LoginDto) => {     
      // const res = await axios.post<LoginRes>('auth/login', loginDto);
      const res = await ApiService.post('auth/login', loginDto);
      return res.data;
    },
    onSuccess: (data) => {
     console.log(data.id);
     
      if (data.access_token) {
        setSession(data.access_token, data.user ,data.id);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/dashboard/user/list');
      }
    },
  });
}
