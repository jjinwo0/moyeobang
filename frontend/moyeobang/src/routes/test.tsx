/** @jsxImportSource @emotion/react */
import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';
import Navbar from '@/components/common/navBar/Navbar';
import React from 'react';
import {css} from '@emotion/react';
import MessagePopup from '@/components/common/messagePopup/MessagePopup';
import CalculatePopup from '@/components/common/calculate/CalculatePopup';
import '@/styles/fonts.css';

const message = css`
  font-family: 'medium';
`;

export const Route = createFileRoute('/test')({
  component: () => {
    // useState를 함수 내부에서 선언합니다.
    const [showCalculatePopup, setShowCalculatePopup] = useState(false);

    return (
      <>
        {/* 정산 버튼 클릭 시 팝업 상태 변경 */}
        <Navbar onCalClick={() => setShowCalculatePopup(!showCalculatePopup)} />

        <MessagePopup
          message={
            <div css={message}>
              <span>여기서 2명의 사람들이 평균</span>
              <br />
              <span style={{color: 'blue'}}>120000원</span> 사용했나방
            </div>
          }
        />

        {/* 상태가 true일 때만 CalculatePopup 표시 */}
        {showCalculatePopup && <CalculatePopup />}
      </>
    );
  },
});
