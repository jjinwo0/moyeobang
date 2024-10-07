import React from 'react';
import {css} from '@emotion/react';
import {createFileRoute} from '@tanstack/react-router';
import {colors} from '@/styles/colors';
import bangBang from '@/assets/icons/bangBang.png';

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
  return (
    <>
      <div css={layoutStyle}>
        <div id="success-text">로그인 성공</div>
        <img css={spinnerImageStyle} src={bangBang} alt="" />
      </div>
    </>
  );
}
