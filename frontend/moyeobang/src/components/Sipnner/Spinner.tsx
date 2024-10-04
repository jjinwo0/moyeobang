import React from 'react';
import bangbang from '@/assets/icons/bangBang.png';
import {css} from '@emotion/react';

const spinnerContainerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spinnerImageStyle = css`
  width: 150px;
  height: 150px;

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

export default function Spinner() {
  return (
    <div css={spinnerContainerStyle}>
      <img src={bangbang} css={spinnerImageStyle} />
    </div>
  );
}
