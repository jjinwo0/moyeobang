import React, {useState} from 'react';
import {css} from '@emotion/react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import BankConnection from './BankConnection';
import CertificationOne from './CertificationOne'; // 추가된 컴포넌트

const modalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  z-index: 100;
`;

const textStyle = css`
  font-family: 'bold';
  font-size: 24px;
  margin: 40px 0;
  padding: 20px;
`;

interface BankAuthProps {
  onClose: () => void;
  onVerify: () => void; // 인증 완료 시 호출할 콜백 함수
}

export default function BankAuth({onClose, onVerify}: BankAuthProps) {
  const [isBankConnected, setIsBankConnected] = useState<boolean>(false); // 상태 추가

  const handleBankIconClick = () => {
    setIsBankConnected(true); // 클릭 시 상태를 true로 변경하여 컴포넌트 전환
  };

  return (
    <div css={modalStyle}>
      <HeaderWithXButton onXClick={onClose} />
      <div css={textStyle}>본인인증</div>

      {/* 상태에 따라 다른 컴포넌트를 렌더링 */}
      {!isBankConnected ? (
        <BankConnection onBankIconClick={handleBankIconClick} />
      ) : (
        <CertificationOne onClose={onClose} onVerify={onVerify} />
      )}
    </div>
  );
}
