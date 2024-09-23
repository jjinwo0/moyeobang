/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';
import {colors} from '@/styles/colors';
import Btn from '../btn/Btn';

const btnLayout = css`
  display: flex;
  gap: 40px;
`;

interface CalculateBtnProps {
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
}

export default function CalculateBtn({setShowModal}: CalculateBtnProps) {
  const handlePublicDeposit = () => {
    setShowModal('publicDeposit');
  };

  const handlePersonalDeposit = () => {
    setShowModal('personalDeposit');
  };
  return (
    <div css={btnLayout}>
      <Btn
        buttonStyle={{style: 'greenBlue', size: 'middleSquare'}}
        onClick={handlePublicDeposit}
      >
        공금 요청해방
      </Btn>
      <Btn
        buttonStyle={{style: 'blue', size: 'middleSquare'}}
        onClick={handlePersonalDeposit}
      >
        개인 입금해방
      </Btn>
    </div>
  );
}
