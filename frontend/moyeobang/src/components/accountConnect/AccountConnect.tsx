import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import AuthVerification from '../travelHome/AuthVerification';

const modalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const contentStyle = css`
  padding: 20px;
  flex-grow: 1; /* 남는 공간을 차지하게 만듦 */
  display: flex;
  flex-direction: column;
  position: relative; /* 달력 포지셔닝을 위해 relative 설정 */
`;

const titleStyle = css`
  display: flex;
  justify-content: center;
  margin: 40px 0;
  font-family: 'bold';
  font-size: 24px;
`;

const titleBlue = css`
  color: ${colors.fifth};
  margin-left: 3px;
`;

export default function AccountConnect() {
  return (
    <>
      <div css={modalStyle}>
        <div css={contentStyle}>
          <div css={titleStyle}>
            <span>계좌</span>
            <span css={titleBlue}>연결해방</span>
          </div>

          <AuthVerification isOnlyConnect={true} />
        </div>
      </div>
    </>
  );
}
