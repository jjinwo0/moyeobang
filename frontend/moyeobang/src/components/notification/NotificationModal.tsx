import {css} from '@emotion/react';
import React from 'react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import HurryNotification from './HurryNotification';
import PublicRequest from './PublicRequest';

interface NotificationModalProps {
  onXClick: () => void;
}

const layoutStyle = css`
  margin-top: 70px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`;

const notificationStyle = css`
  display: flex;
  flex-direction: column; /* 세로로 나열 */
  gap: 10px; /* 컴포넌트들 사이 간격을 20px로 설정 */
  width: 100%; /* 필요한 경우 너비 설정 */
`;

export default function NotificationModal({onXClick}: NotificationModalProps) {
  return (
    <>
      <HeaderWithXButton onXClick={onXClick} />
      <div css={layoutStyle}>
        <div css={notificationStyle}>
          <HurryNotification />
          <PublicRequest />
        </div>
      </div>
    </>
  );
}
