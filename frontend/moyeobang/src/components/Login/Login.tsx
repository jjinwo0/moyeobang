import React from 'react';
import {useLogin} from '@/hooks/useLogin';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import skyBackground from '@/assets/images/skyBackground.jpg';
import bangBang from '@/assets/icons/bangBang.png';
import kakaoLogin from '@/assets/icons/kakaoLogin.png';
import googleLogin from '@/assets/icons/googleLogin.png';

// const baseUrl = import.meta.env.VITE_BASEURL + '/api';

const LoginStyle = css`
  width: 390px;
  height: 100vh;
  background-image: url(${skyBackground});
  background-size: cover;
  background-position: center;
  #sky-blur {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #sky-blur-title {
    font-size: 24px;
    font-weight: bold;
  }
  #sky-blur-subtitle {
    margin-top: 20px;
    font-size: 40px;
    font-family: 'surround';
    color: ${colors.third};
  }
  #bang-bang {
    width: 250px;
    height: 250px;
  }
  #login-buttons {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    img {
      cursor: pointer;
    }
  }
`;

export default function Login() {
  const {handleLogin} = useLogin();

  return (
    <div css={LoginStyle}>
      <div id="sky-blur">
        <div id="sky-blur-title">모임통장과 여행을 한방에</div>
        <div id="sky-blur-subtitle">모여방</div>
        <img src={bangBang} alt="bangBang" id="bang-bang" />
        <div id="login-buttons">
          {/* {baseUrl} */}
          {/* {baseUrl && ( */}
          {/* <a href={`${baseUrl}/oauth2/authorization/kakao`}> */}
          <img
            src={kakaoLogin}
            alt="kakaoLogin"
            id="kakao-login"
            onClick={() => handleLogin('kakao')}
          />
          {/* </a> */}
          {/* )} */}
          <img
            src={googleLogin}
            alt="googleLogin"
            id="google-login"
            onClick={() => handleLogin('google')}
          />
        </div>
      </div>
    </div>
  );
}
