import axios from 'axios';

// 배포시 BASE URL 확인할 것, .env 파일에 VITE_BASEURL = {실제 서버 BASE URL} 추가
const instance8081 = axios.create({
//   baseURL: import.meta.env.VITE_BASEURL + '/api',
  baseURL: 'http://localhost:8081/van',
  // baseURL: 'http://j11c201.p.ssafy.io:8081',
  responseType: 'json',
  timeout: 4000,
//   withCredentials: true,  //로그인 구현 후 사용 쿠키와 같은 자격 증명을 요청
});

export default instance8081;