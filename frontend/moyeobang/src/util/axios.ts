// 쿠키로 시도
import axios from 'axios';
import {getCookie, removeCookie, setCookie} from './cookie';
// axios 인스턴스를 반환하는 함수

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + '/api',
  headers: {'Content-Type': 'application/json'},
  timeout: 4000,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  async config => {
    const accessToken = getCookie('accessToken');
    console.log(' 여긴 오나 ? accessToken', accessToken);
    if (accessToken) {
      console.log('accessToken', accessToken);
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const refreshToken = getCookie('refresh-token');
    console.log('refreshToken', refreshToken);

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
        const refreshToken = getCookie('refresh-token');
        const response = await instance.get(`/reissue/token`, {
          headers: {Authorization: `Bearer ${refreshToken}`},
        });

        if (response) {
          console.log('response', response);
          const newAccessToken = response.data.accessToken;
          console.log('newAccessToken', newAccessToken);
          setCookie('accessToken', newAccessToken, 900);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        removeCookie('accessToken');
        removeCookie('refresh-token');
        window.location.href = '/entrance';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

// 다시 sessionStorage로 시도, 성공 버전
// import axios from 'axios';
// import {getCookie, removeCookie, setCookie} from './cookie';
// // axios 인스턴스를 반환하는 함수

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_BASEURL + '/api',
//   headers: {'Content-Type': 'application/json'},
//   timeout: 4000,
// });

// // 요청 인터셉터 설정
// instance.interceptors.request.use(
//   async config => {
//     const accessToken = localStorage.getItem('accessToken');

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
// instance.interceptors.response.use(
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
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await instance.get(`/reissue/token`, {
//           headers: {Authorization: refreshToken},
//         });

//         if (response) {
//           console.log('response', response);
//           const newAccessToken = response.data.accessToken;
//           localStorage.setItem('accessToken', newAccessToken);

//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return instance(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error('Failed to refresh access token:', refreshError);
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/entrance';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
