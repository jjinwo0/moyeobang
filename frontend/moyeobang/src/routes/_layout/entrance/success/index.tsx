import React, {useEffect} from 'react';
import {css} from '@emotion/react';
import {
  createFileRoute,
  useMatch,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import {colors} from '@/styles/colors';
import bangBang from '@/assets/icons/bangBang.png';
import {z} from 'zod';
import {useAuthContext} from '@/contexts/AuthContext';
import axiosLogin from '@/util/axiosLogin';
import {useSuspenseQuery} from '@tanstack/react-query';
import moyeobang from '@/services/moyeobang';
import useAxiosLogin from '@/util/axiosLogin';

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
  const {handleLoginToken} = useAuthContext();
  const navigate = useNavigate();
  const {
    accessToken,
    accessTokenExpireTime,
    refreshToken,
    refreshTokenExpireTime,
  }: {
    accessToken: string;
    accessTokenExpireTime: string;
    refreshToken: string;
    refreshTokenExpireTime: string;
  } = Route.useSearch();

  /**
   * 내 정보 조회
   */

  useEffect(() => {
    if (accessToken && refreshToken) {
      // 로그인 성공시 토큰 저장
      handleLoginToken(
        accessToken,
        accessTokenExpireTime,
        refreshToken,
        refreshTokenExpireTime
      );
      // 내 정보 조회
      const axiosLogin = useAxiosLogin();
      const {data} = useSuspenseQuery({
        queryKey: ['myInfo'],
        queryFn: () => moyeobang.getMyInfo(axiosLogin),
      });
      const myInfo = data.data;
      console.log('myInfo', myInfo);
      // 계좌 정보가 없으면 계좌 등록 페이지로 이동
      if (myInfo.accountId) {
        navigate({to: '/'});
      } else {
        // [todo] 계좌 정보가 없으면 계좌 등록 페이지로 이동
        navigate({to: '/entrance'});
      }
    } else {
      // 로그인 실패시 로그인 페이지로 이동
      navigate({to: '/entrance'});
    }
  }, [
    accessToken,
    accessTokenExpireTime,
    refreshToken,
    refreshTokenExpireTime,
  ]);

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
