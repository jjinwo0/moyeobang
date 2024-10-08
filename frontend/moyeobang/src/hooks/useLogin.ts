import useAuthLogin from "@/store/useAuthLoginStore";

const baseUrl = import.meta.env.VITE_BASEURL + '/api';
const {setLoginProvider} = useAuthLogin();

export const useLogin = () => {
  const handleLogin = (provider: string) => {
    setLoginProvider(provider);
    window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;  

  };
  return {handleLogin};
};
