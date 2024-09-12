import React from 'react';
import bankIcon from '@/assets/icons/bankIcon.png';
import {css} from '@emotion/react';

const descriptionStyle = css`
  font-family: 'regular';
  font-size: 18px;
  margin-bottom: 50px;
`;

interface BankConnectionProps {
  onBankIconClick: () => void;
}

export default function BankConnection({onBankIconClick}: BankConnectionProps) {
  return (
    <div>
      <p css={descriptionStyle}>모임통장과 연결할 계좌를 선택해주세요</p>
      <img
        src={bankIcon}
        width={287}
        onClick={onBankIconClick} // 이미지 클릭 시 onBankIconClick 호출
        style={{cursor: 'pointer'}} // 클릭 가능한 이미지로 설정
      />
    </div>
  );
}
