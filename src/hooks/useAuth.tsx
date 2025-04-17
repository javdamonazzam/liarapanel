// ----------------------------------------------------------------------

import useLoginMutation, { useLoginStepTwoMutation } from '@/react-query/auth/useLoginMutation.ts';
// import useInitAuth from '@/react-query/auth/useInitAuth.ts';
import { setSession, getToken } from '@utils/jwt.ts';
import { axiosInstance } from '@utils/axios.ts';

const useAuth = () => {
  // const login = useLoginMutation();
  
  const loginStepTwo = useLoginStepTwoMutation();
  
  // const { data: user } = useInitAuth();
  // console.log(user.email);

  function logout() {
    window.localStorage.removeItem('accessToken');
    setSession(null);
    axiosInstance.defaults.headers.common.Authorization = '';
  }

  return {  loginStepTwo,  logout, getToken };
};

export default useAuth;
