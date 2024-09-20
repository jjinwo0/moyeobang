import React from 'react';
import {css} from '@emotion/react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import {colors} from '@/styles/colors';

const plusSelfLayout = css`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
`;

interface PlusSelfProps {
  handlePlusSelf: () => void; // 함수형 props 정의
}

export default function PlusSelf({handlePlusSelf}: PlusSelfProps) {
  return (
    <div css={plusSelfLayout}>
      <HeaderWithXButton onXClick={handlePlusSelf} />
      <div style={{marginTop: '50px', fontFamily: 'bold', fontSize: '24px'}}>
        {' '}
        <span>일정을</span> <span style={{color: colors.fifth}}>적어방</span>
      </div>
    </div>
  );
}
