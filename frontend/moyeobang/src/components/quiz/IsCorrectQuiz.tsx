import React from 'react';
import {css} from '@emotion/react';
import bangBang from '@/assets/icons/bangBang.png';
import sadBangbang from '@/assets/icons/sadBangbang.png';
import Btn from '@/components/common/btn/Btn';
import closeButton from '@/assets/icons/closeButton.png';
import {useRouter} from '@tanstack/react-router';

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContentStyle = css`
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  img {
    width: 15px; /* 이미지의 크기를 명확하게 설정 */
    height: 15px; /* 이미지의 크기를 명확하게 설정 */
  }
`;

const logoStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  margin-right: 10px;

  p {
    font-size: 18px;
    font-weight: bold;
  }

  img {
    width: 45px;
    margin-right: 10px;
  }
`;

const textStyle = css`
  text-align: center;
  margin-bottom: 10px;

  p {
    margin: 0;
    line-height: 1.4;
  }
`;

export default function IsCorrectQuiz({
  isCorrect,
  onClose,
}: {
  isCorrect: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const handleClose = () => {
    // console.log('close');
    router.navigate({to: '/'});
  };
  return (
    <div css={modalOverlayStyle}>
      <div css={modalContentStyle}>
        <div css={closeButtonStyle} onClick={handleClose}>
          <img src={closeButton} alt="closeButton" />
        </div>
        <div css={logoStyle}>
          <img src={isCorrect ? bangBang : sadBangbang} alt="quizResultIcon" />{' '}
          {/* 조건부 이미지 렌더링 */}
          <p>모여방</p>
        </div>
        <div css={textStyle}>
          {isCorrect ? (
            <>
              <p>정답입니다!</p>
              <p>여행을 함께하세요!</p>
            </>
          ) : (
            <>
              <p>오답입니다!</p>
              <p>다시 도전해보세요!</p>
            </>
          )}
        </div>
        {isCorrect && (
          <Btn
            buttonStyle={{style: 'blue', size: 'middle'}}
            onClick={handleClose}
          >
            확인
          </Btn>
        )}
        {!isCorrect && (
          <Btn buttonStyle={{style: 'blue', size: 'middle'}} onClick={onClose}>
            다시도전
          </Btn>
        )}
      </div>
    </div>
  );
}
