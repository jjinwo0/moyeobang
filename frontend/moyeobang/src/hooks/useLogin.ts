import {useAuthContext} from '@/contexts/AuthContext';

const baseUrl = import.meta.env.VITE_BASEURL + '/api';

export const useLogin = () => {
  const {setLoginProvider} = useAuthContext();
  const handleLogin = (provider: string) => {
    setLoginProvider(provider);
    window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;  
  };
  return {handleLogin};
};
