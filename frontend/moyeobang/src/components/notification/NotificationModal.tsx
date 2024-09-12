import {css} from '@emotion/react';
import React from 'react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';

interface NotificationModalProps {
  onXClick: () => void;
}

const layoutStyle = css`
  // margin-top: 50px;
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

export default function NotificationModal({onXClick}: NotificationModalProps) {
  return (
    <>
      <div css={layoutStyle}>
        <HeaderWithXButton onXClick={onXClick} />
        <div>알림모달</div>
      </div>
    </>
  );
}
