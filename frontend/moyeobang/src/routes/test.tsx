import {createFileRoute} from '@tanstack/react-router';
import {css} from '@emotion/react';
import Navbar from '@/components/common/navBar/Navbar';
import MessagePopup from '@/components/common/messagePopup/MessagePopup';
import '@/styles/fonts.css';

const message = css`
  font-family: 'medium';
`;

export const Route = createFileRoute('/test')({
  component: () => (
    <>
      <Navbar />
      <MessagePopup
        message={
          <div css={message}>
            <span>여기서 2명의 사람들이 평균</span>
            <br />
            <span style={{color: 'blue'}}>120000원</span> 사용했나방
          </div>
        }
      />
    </>
  ),
});
