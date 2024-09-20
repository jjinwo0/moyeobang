import React from 'react';
import {css} from '@emotion/react';
import Btn from '../common/btn/Btn';
import {colors} from '@/styles/colors';
import clipboardIcon from '@/assets/icons/clipboardIcon.png';

const data: Quiz = {
  id: 1,
  question: '문제요',
  answer: '답이어라',
};

const invitationLink: InvitationLink = 'https://yourapp.com/invite-link';

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
`;

const modalContentStyle = css`
  color: ${colors.fifth};
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px; /* padding을 줄여 아이콘이 넘치지 않도록 조정 */
  border-radius: 10px;
  width: 260px; /* 모달의 폭을 넓힘 */
  text-align: center;
  font-family: 'bold';
  font-size: 24px;
  gap: 10px;

  span {
    color: ${colors.black};
  }
`;

// 초대 링크 스타일
const inviteLinkStyle = css`
  font-family: 'semibold';
  font-size: 16px;
  color: ${colors.black};
  display: flex;
  justify-content: space-between; /* 링크와 복사 버튼 간의 간격 조정 */
  align-items: center;
  border: 1px solid ${colors.gray};
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 15px;

  span {
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    overflow: hidden; /* 텍스트가 넘치지 않게 숨김 */
    text-overflow: ellipsis; /* 텍스트가 넘치면 생략표시 (...) */
    margin-right: 10px; /* 복사 버튼과 간격 */
  }
`;

const copyButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 24px;
  }
`;

// 퀴즈 질문 스타일
const questionStyle = css`
  font-family: 'semibold';
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${colors.black};
`;

// 정답 스타일
const answerStyle = css`
  font-family: 'semibold';
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${colors.black};
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const englishStyle = css`
  font-family: 'englishbold';
  margin-right: 10px;
  font-size: 20px;
`;

interface ConfirmQuizProps {
  onClose: () => void;
}

export default function ConfirmQuiz({onClose}: ConfirmQuizProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationLink);
    alert('초대 링크가 복사되었습니다.');
  };

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContentStyle}>
        {/* 초대 링크와 복사 버튼 */}
        <div>초대퀴즈</div>
        <div css={inviteLinkStyle}>
          <span>{invitationLink}</span>
          <div css={copyButtonStyle} onClick={copyToClipboard}>
            <img src={clipboardIcon} />
          </div>
        </div>

        <div css={questionStyle}>
          <span css={englishStyle}>Q</span>
          <span>{data.question}</span>
        </div>
        <div css={answerStyle}>
          <span css={englishStyle}>A</span>
          <span>{data.answer}</span>
        </div>

        {/* 확인 버튼 */}
        <div css={buttonContainerStyle}>
          <Btn buttonStyle={{style: 'blue', size: 'small'}} onClick={onClose}>
            확인
          </Btn>
        </div>
      </div>
    </div>
  );
}
