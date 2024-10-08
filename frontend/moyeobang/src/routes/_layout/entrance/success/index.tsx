import React, {useEffect} from 'react';
import {css} from '@emotion/react';
import {createFileRoute, useNavigate, useLocation} from '@tanstack/react-router';
import {useQueryClient, useQuery} from '@tanstack/react-query';
import {colors} from '@/styles/colors';
import bangBang from '@/assets/icons/bangBang.png';
import {z} from 'zod';
import moyeobang from '@/services/moyeobang';
import useAxiosLogin from '@/util/axiosLogin';
import useAuthLogin from '@/store/useAuthLoginStore';
import useMyInfo from '@/store/useMyInfoStore';

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
  const navigate = useNavigate();
  const axiosLogin = useAxiosLogin();
  const location = useLocation();
  // location 객체에서 쿼리 문자열을 가져옴
  const searchParams = new URLSearchParams(location.search);
  const getAccessToken = searchParams.get('accessToken');
  const accessTokenExpireTime = searchParams.get('accessTokenExpireTime');
  const getRefreshToken = searchParams.get('refreshToken');
  const refreshTokenExpireTime = searchParams.get('refreshTokenExpireTime');

  console.log('Access Token:', getAccessToken);
  console.log('Access Token Expire Time:', accessTokenExpireTime);
  console.log('Refresh Token:', getRefreshToken);
  console.log('Refresh Token Expire Time:', refreshTokenExpireTime);

 
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setAccessTokenExpireTime,
    setRefreshTokenExpireTime,
  } = useAuthLogin();
  const {
    setMemberId,
    setMemberName,
    setProfileImage,
    setBankName,
    setAccountNumber,
    setAccountId,
  } = useMyInfo();
  /**
   * 내 정보 조회
   */
  const {data: myInfoData} = useQuery({
    queryKey: [],
    queryFn: () => moyeobang.getMyInfo(),
    enabled: !!accessToken && !!refreshToken,
  });

  useEffect(() => {
    if (getAccessToken && getRefreshToken) {
      // 로그인 성공시 토큰 저장
      setAccessToken(getAccessToken);
      setRefreshToken(getRefreshToken);
      setAccessTokenExpireTime(accessTokenExpireTime || '');
      setRefreshTokenExpireTime(refreshTokenExpireTime || '');
    }
  }, [
    accessToken,
    accessTokenExpireTime,
    refreshToken,
    refreshTokenExpireTime,
  ]);

  useEffect(() => {
    if (myInfoData) {
      const myInfo = myInfoData;
      console.log('myInfo', myInfo);
      // 계좌 정보가 없으면 계좌 등록 페이지로 이동
    //   if (myInfo.accountId) {
    //     setMemberId(myInfo.memberId);
    //     setMemberName(myInfo.memberName);
    //     setProfileImage(myInfo.profileImage);
    //     setBankName(myInfo.bankName);
    //     setAccountNumber(myInfo.accountNumber);
    //     setAccountId(myInfo.accountId);
    //     navigate({to: '/'});
    //   } else {
    //     navigate({to: '/accountConnect'});
    //   }
    }
  }, [myInfoData, navigate]);

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
