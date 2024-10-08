
const baseUrl = import.meta.env.VITE_BASEURL + '/api';

export const useLogin = () => {
  const handleLogin = (provider: string) => {
    localStorage.setItem('loginProvider', provider);
    window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
  };
  return {handleLogin};
};
