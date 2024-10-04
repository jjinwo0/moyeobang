import { useAuthContext } from "@/contexts/AuthContext";
import axiosLogin from "@/util/axiosLogin";

export const useLogin = () => {
  const { handleLoginToken } = useAuthContext();

  // 로그인 요청 함수
  const handleLogin = async (provider: string) => {
    try {
      const response = await axiosLogin.post(`/oauth2/authorization/${provider}`);
      const accessToken = response.data.accessToken;
      handleLoginToken(accessToken, provider);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { handleLogin };
};