import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton';
import skyBackground from '@/assets/images/skyBackground.jpg';
import bangBang from '@/assets/icons/bangBang.png';
import {colors} from '@/styles/colors';
import React from 'react';
import SettingBox from '@/components/travelHome/SettingBox';

export const Route = createFileRoute('/_layout/_protected/_layout/profile/')({
  component: profile,
});

const containerStyle = css`
  width: 100%;
  height: 100vh;
  background-image: url(${skyBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const contentStyle = css`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const profileStyle = css`
  width: 130px;
  height: 130px;
  background-color: white;
  background-image: url(${bangBang});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  // border: solid 2px black;
  border-radius: 50%;
  font-family: 'bold';
  font-size: 32px;
`;

const nicknameStyle = css`
  font-family: 'semibold';
  font-size: 24px;
  margin-bottom: 60px;
  margin-top: 10px;
`;

const blurStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  z-index: 1;
`;

export default function profile() {
  return (
    <>
      <div css={containerStyle}>
        <HeaderWithBackButton />
        <div css={contentStyle}>
          <div css={profileStyle}></div>
          <p css={nicknameStyle}>닉네임</p>
          {/* Render multiple Box components */}
          <SettingBox title="정보수정" />
          <SettingBox
            title="연결계좌"
            description="12345678123"
            updateButton="수정하기 >"
          />
          <SettingBox title="로그아웃" />
        </div>
        <div css={blurStyle}></div>
      </div>
    </>
  );
}
