import axios from 'axios';
import {useAuthContext} from '@/contexts/AuthContext';
import {getCookie} from '@/util/cookie';

function createAxiosLogin() {
  const {
    accessToken,
    setAccessToken,
    handleLogout,
    loginProvider,
    setLoginProvider,
    isLogin,
    setIsLogin,
  } = useAuthContext();

  const axiosLogin = axios.create({
    baseURL: import.meta.env.VITE_BASEURL + '/api',
    responseType: 'json',
    timeout: 4000,
  });
  axiosLogin.interceptors.request.use(
    async config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosLogin.interceptors.response.use(
    response => {
      console.log('[*] response', response);

      return response;
    },
    async error => {
      // 원래 로그인 요청
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie('refreshToken');
        console.log('[*] refreshToken', refreshToken);

        try {
          let response; // 초기화
          if (loginProvider === 'google') {
            response = await axiosLogin.get(`/oauth2/authorization/google`, {
              params: {refreshToken},
            });
          } else if (loginProvider === 'kakao') {
            response = await axiosLogin.get(`/oauth2/authorization/kakao`, {
              params: {refreshToken},
            });
          }
          if (response) {
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosLogin(originalRequest);
          }
        } catch (refreshError) {
          // 리프레시 토큰 만료
          console.log('Failed to refresh access token:', refreshError);
          handleLogout();
        }
        return Promise.reject(error);
      }
    }
  );
  return axiosLogin;
}
export default createAxiosLogin;
