// 쿠키로 시도
import React, {useEffect, useState} from 'react';
import {css} from '@emotion/react';
import {
  createFileRoute,
  useNavigate,
  useLocation,
} from '@tanstack/react-router';
import {colors} from '@/styles/colors';
import bangBang from '@/assets/icons/bangBang.png';

import useMyInfo from '@/store/useMyInfoStore';
import axiosLogin from '@/util/axiosLogin';
import { getCookie, setCookie } from '@/util/cookie';

export const Route = createFileRoute('/_layout/entrance/success/')({
  component: LoginSuccess,
});

const layoutStyle = css`
  width: 390px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin: 120px 0; */

  #success-text {
    font-size: 32px;
    font-family: 'surround';
    margin: 30px;
    color: ${colors.fifth};
  }
`;

const spinnerImageStyle = css`
  width: 200px;
  height: 200px;

  /* 애니메이션 추가 */
  animation: bounce 0.7s infinite ease-in-out;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0); /* 원래 위치 */
    }
    50% {
      transform: translateY(-20px); /* 위로 20px 올라감 */
    }
  }
`;

function LoginSuccess() {
  const [myInfoData, setMyInfoData] = useState<MyInfo>();
  const [getAccessToken, setGetAccessToken] = useState<string>('');
  const {
    setMemberId,
    setMemberName,
    setProfileImage,
    setBankName,
    setAccountNumber,
    setAccountId,
  } = useMyInfo();

  const navigate = useNavigate();
  const location = useLocation();
  // location 객체에서 쿼리 문자열을 가져옴
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('accessToken');
  setGetAccessToken(accessToken || '');


  const accessTokenExpireTime = searchParams.get('accessTokenExpireTime');
  const getRefreshToken = searchParams.get('refreshToken');
  const refreshTokenExpireTime = searchParams.get('refreshTokenExpireTime');

  console.log('Access Token:', accessToken);
  console.log('Access Token Expire Time:', accessTokenExpireTime);
  console.log('Refresh Token:', getRefreshToken);
  console.log('Refresh Token Expire Time:', refreshTokenExpireTime);

  useEffect(() => {
    if (getAccessToken!=='') {
     setCookie('accessToken', getAccessToken, 900);
     console.log('accessToken', getCookie('accessToken'));
     axiosLogin.get('/user/me/profile').then(res => {
      console.log('myInfoData', res);
      setMyInfoData(res.data.data);
    });
    }
  }, [getAccessToken]);

  // useEffect(() => {
  //   if (getAccessToken) {
  //     // 15분(900초) 동안 유효한 쿠키 설정
  //     setCookie('accessToken', getAccessToken, 900);
  //     console.log('accessToken', getCookie('accessToken'));
  //     axiosLogin.get('/user/me/profile').then(res => {
  //       console.log('myInfoData', res);
  //       setMyInfoData(res.data.data);
  //     });
  //   }
  // }, [getAccessToken]);


  useEffect(() => {
    if (myInfoData) {
      const myInfo = myInfoData;
      console.log('myInfo', myInfo);
      setMemberId(myInfo.id);
      setMemberName(myInfo.name);
      setProfileImage(myInfo.image);
      setBankName(myInfo.bankName);
      setAccountNumber(myInfo.accountNumber);
      // 계좌 정보가 없으면 계좌 등록 페이지로 이동
      if (myInfo.accountId) {
        setAccountId(myInfo.accountId);
        navigate({to: '/'});
      } else {
        navigate({to: '/entrance/success/allowNoti'});
      }
    }
  }, [myInfoData]);

  // 모든 쿼리 파라미터를 가져오기
  return (
    <>
      <div css={layoutStyle}>
        <div id="success-text">로그인 성공</div>
        <img css={spinnerImageStyle} src={bangBang} alt="" />
      </div>
    </>
  );
}

// sessionStorage로 시도 성공한 내용
// import React, {useEffect, useState} from 'react';
// import {css} from '@emotion/react';
// import {
//   createFileRoute,
//   useNavigate,
//   useLocation,
// } from '@tanstack/react-router';
// import {useQueryClient, useQuery} from '@tanstack/react-query';
// import {colors} from '@/styles/colors';
// import bangBang from '@/assets/icons/bangBang.png';
// import {z} from 'zod';
// import moyeobang from '@/services/moyeobang';
// import useAxiosLogin from '@/util/axiosLogin';
// import useAuthLogin from '@/store/useAuthLoginStore';
// import useMyInfo from '@/store/useMyInfoStore';
// import axiosLogin from '@/util/axiosLogin';

// export const Route = createFileRoute('/_layout/entrance/success/')({
//   component: LoginSuccess,
// });

// const layoutStyle = css`
//   width: 390px;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   /* margin: 120px 0; */

//   #success-text {
//     font-size: 32px;
//     font-family: 'surround';
//     margin: 30px;
//     color: ${colors.fifth};
//   }
// `;

// const spinnerImageStyle = css`
//   width: 200px;
//   height: 200px;

//   /* 애니메이션 추가 */
//   animation: bounce 0.7s infinite ease-in-out;

//   @keyframes bounce {
//     0%,
//     100% {
//       transform: translateY(0); /* 원래 위치 */
//     }
//     50% {
//       transform: translateY(-20px); /* 위로 20px 올라감 */
//     }
//   }
// `;

// function LoginSuccess() {
//   const [myInfoData, setMyInfoData] = useState<MyInfo>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   // location 객체에서 쿼리 문자열을 가져옴
//   const searchParams = new URLSearchParams(location.search);
//   const getAccessToken = searchParams.get('accessToken');
//   const accessTokenExpireTime = searchParams.get('accessTokenExpireTime');
//   const getRefreshToken = searchParams.get('refreshToken');
//   const refreshTokenExpireTime = searchParams.get('refreshTokenExpireTime');

//   console.log('Access Token:', getAccessToken);
//   console.log('Access Token Expire Time:', accessTokenExpireTime);
//   console.log('Refresh Token:', getRefreshToken);
//   console.log('Refresh Token Expire Time:', refreshTokenExpireTime);

//   const {
//     setMemberId,
//     setMemberName,
//     setProfileImage,
//     setBankName,
//     setAccountNumber,
//     setAccountId,
//   } = useMyInfo();
//   /**
//    * 내 정보 조회
//    */
//   // const {data: myInfoData} = useQuery({
//   //   queryKey: [],
//   //   queryFn: () => moyeobang.getMyInfo(),
//   //   enabled:
//   //     !!localStorage.getItem('accessToken') &&
//   //     !!localStorage.getItem('refreshToken'),
//   // });

//   useEffect(() => {
//     if (getAccessToken && getRefreshToken) {
//       localStorage.setItem('accessToken', getAccessToken);
//       localStorage.setItem('refreshToken', getRefreshToken);
//       localStorage.setItem(
//         'accessTokenExpireTime',
//         accessTokenExpireTime || ''
//       );
//       localStorage.setItem(
//         'refreshTokenExpireTime',
//         refreshTokenExpireTime || ''
//       );
//       axiosLogin.get('/user/me/profile').then(res => {
//         console.log('myInfoData', res);
//         setMyInfoData(res.data.data);
//       });

//       // 로그인 성공시 토큰 저장
//       // setAccessToken(getAccessToken);
//       // setRefreshToken(getRefreshToken);
//       // setAccessTokenExpireTime(accessTokenExpireTime || '');
//       // setRefreshTokenExpireTime(refreshTokenExpireTime || '');
//     }
//   }, [
//     localStorage.getItem('accessToken'),
//     localStorage.getItem('accessTokenExpireTime'),
//     localStorage.getItem('refreshToken'),
//     localStorage.getItem('refreshTokenExpireTime'),
//   ]);

//   useEffect(() => {
//     if (myInfoData) {
//       const myInfo = myInfoData;
//       console.log('myInfo', myInfo);
//       setMemberId(myInfo.id);
//       setMemberName(myInfo.name);
//       setProfileImage(myInfo.image);
//       setBankName(myInfo.bankName);
//       setAccountNumber(myInfo.accountNumber);
//       // 계좌 정보가 없으면 계좌 등록 페이지로 이동
//       if (myInfo.accountId) {
//         setAccountId(myInfo.accountId);
//         navigate({to: '/'});
//       } else {
//         navigate({to: '/entrance/success/allowNoti'});
//       }
//     }
//   }, [myInfoData]);

//   // 모든 쿼리 파라미터를 가져오기
//   return (
//     <>
//       <div css={layoutStyle}>
//         <div id="success-text">로그인 성공</div>
//         <img css={spinnerImageStyle} src={bangBang} alt="" />
//       </div>
//     </>
//   );
// }
