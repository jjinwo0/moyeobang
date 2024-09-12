import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import HeaderWithBackButton from '@/components/common/Header/HeaderWithBackButton';
import skyBackground from '@/assets/images/skyBackground.jpg';
import {colors} from '@/styles/colors';
import React from 'react';

export const Route = createFileRoute('/_layout/_protected/_layout/profile/')({
  component: profile,
});

const containerStyle = css`
  width: 100%;
  height: 100vh; /* Ensure the height covers the full viewport */
  background-image: url(${skyBackground});
  /* opacity: 0.2; */
  background-size: cover; /* Ensure the background covers the container */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent repeating the background */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center; /* Center horizontally */
`;

const contentStyle = css`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  z-index: 2;
`;
const profileStyle = css`
  width: 130px;
  height: 130px;
  background-color: white;
  display: flex;
  /* margin-bottom: 100px; */
  border-radius: 50%;
  font-family: 'bold';
  font-size: 32px;
`;

const boxStyle = css`
  width: 100%;
  height: 63px;
  background-color: white;
  border: 1px solid ${colors.customGreenBlue};
  border-radius: 5%;
  margin-bottom: 6px;
`;

const nicknameStyle = css`
  font-family: 'bold';
  font-size: 32px;
  margin-bottom: 80px;
  margin-top: 10px;
`;
const blurStyle = css`
  position: absolute; /* Make sure it covers the entire background */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.3); /* Semi-transparent white */
  backdrop-filter: blur(10px); /* Apply the blur effect */
  z-index: 1; /* Ensure it’s above the background but below other content */
`;

export default function profile() {
  return (
    <>
      <div css={containerStyle}>
        <HeaderWithBackButton />
        <div css={contentStyle}>
          <div css={profileStyle}></div>
          <p css={nicknameStyle}>닉네임</p>
          <div css={boxStyle}></div>
          <div css={boxStyle}></div>
          <div css={boxStyle}></div>
        </div>
        <div css={blurStyle}></div>
      </div>
    </>
  );
}
