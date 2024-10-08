// import axios from 'axios';
// import {useNavigate} from '@tanstack/react-router';
// import {getCookie, removeCookie, setCookie} from './cookie';
// // axios 인스턴스를 반환하는 함수

// const axiosLogin = axios.create({
//   baseURL: import.meta.env.VITE_BASEURL + '/api',
//   headers: {'Content-Type': 'application/json'},
//   timeout: 4000,
// });

// // 요청 인터셉터 설정
// axiosLogin.interceptors.request.use(
//   async config => {
//     const accessToken = getCookie('accessToken');

//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 설정
// axiosLogin.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     const refreshToken = getCookie('refreshToken');

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       if (!refreshToken) {
//         console.error('No refresh token available');

//         return Promise.reject(error);
//       }

//       try {
//         const refreshToken = getCookie('refreshToken');
//         const response = await axiosLogin.get(`/reissue/token`, {
//           headers: {Authorization: refreshToken},
//         });

//         if (response) {
//           console.log('response', response);
//           const newAccessToken = response.data.accessToken;
//           setCookie('accessToken', newAccessToken, 900);

//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosLogin(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error('Failed to refresh access token:', refreshError);
//         removeCookie('accessToken');
//         removeCookie('refreshToken');
//         window.location.href = '/entrance';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosLogin;


import axios from 'axios';

// axios 인스턴스를 반환하는 함수

const axiosLogin = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + '/api',
  headers: {'Content-Type': 'application/json'},
  timeout: 4000,
});

// 요청 인터셉터 설정
axiosLogin.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      console.log('로그인 헤더 넣기', accessToken);

      config.headers['Authorization'] = `Bearer ${accessToken}`;

      console.log('로그인 헤더 넣기', config.headers.Authorization);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosLogin.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    const loginProvider = localStorage.getItem('loginProvider');

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!refreshToken) {
        console.error('No refresh token available');

        return Promise.reject(error);
      }

      try {
        let response;
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
          localStorage.setItem('accessToken', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosLogin(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('loginProvider');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosLogin;
