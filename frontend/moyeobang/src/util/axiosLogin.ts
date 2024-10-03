// import axios from 'axios';
// import {useAuthContext} from '@/contexts/AuthContext';
// import { getCookie } from '@/util/cookie';
// const {accessToken} = useAuthContext();

// const axiosLogin = axios.create({
//   baseURL: import.meta.env.VITE_BASEURL,
//   responseType: 'json',
//   timeout: 4000,
// });

// axiosLogin.interceptors.request.use(
//   async config => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// axiosLogin.interceptors.response.use(response => {
//   return response;
// },
// async (error) => {
//   const originalRequest = error.config;
//   if(error.response.status === 401 && !originalRequest._retry){
//     originalRequest._retry = true;

//     const refreshToken = getCookie('refreshToken')
//   }
// }

// );

// export default axiosLogin;
