import {useAuthContext} from '@/contexts/AuthContext';
import createAxiosLogin from '@/util/axiosLogin';

export const useLogin = () => {
  const {handleLoginToken} = useAuthContext();
  const axiosLogin = createAxiosLogin();

  // 로그인 요청 함수
  const handleLogin = async (provider: string) => {
    try {
      const response = await axiosLogin.post(
        `/oauth2/authorization/${provider}`
      );
      console.log('[*] response', response);
      const accessToken = response.data.accessToken;
      handleLoginToken(accessToken, provider);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {handleLogin};
};
