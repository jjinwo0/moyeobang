import React, {useState, useEffect} from 'react';
import {css, keyframes} from '@emotion/react';
import ssafyIcon from '@/assets/icons/ssafyLogo.jpg';
import {colors} from '@/styles/colors';

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const modalStyle = css`
  position: fixed;
  top: 10px; /* 시작 위치를 조정 */
  width: 95%;
  margin-right: 3px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  z-index: 300;
  animation: slide-in 0.3s ease-out;

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const titleStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 24px;
    margin-right: 10px; /* 이미지와 텍스트 사이의 간격 */
  }

  #title {
    font-size: 20px;
    font-family: 'semibold';
  }
`;

const nameStyle = css`
  font-size: 16px;
  font-family: 'bold';
  color: ${colors.fifth};
`;

const descriptionStyle = css`
  font-size: 16px;
  font-family: 'regular';
`;

interface SsafyBankNotificationProps {
  setCertificationVisible: (visible: boolean) => void;
  randomVerifyNumber: string;
}

export default function SsafyBankNotification({
  setCertificationVisible,
  randomVerifyNumber,
}: SsafyBankNotificationProps) {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY !== null) {
      setCurrentY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (startY !== null && currentY !== null && startY - currentY > 50) {
      setIsSlidingOut(true);
      setTimeout(() => setCertificationVisible(false), 300); // 애니메이션 시간과 일치
    }
    setStartY(null);
    setCurrentY(null);
  };

  // 자동으로 3초 후에 슬라이드 아웃되도록 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSlidingOut(true);
      setTimeout(() => setCertificationVisible(false), 300);
    }, 5000); // 3초 후 슬라이드 아웃

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 제거
  }, []);

  useEffect(() => {
    if (startY !== null) {
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startY, currentY]);

  return (
    <div
      css={[
        modalStyle,
        isSlidingOut &&
          css`
            animation: ${slideOut} 0.3s ease-out forwards;
          `,
      ]}
      onTouchStart={handleTouchStart}
    >
      <div css={titleStyle}>
        <img src={ssafyIcon} alt="ssafyIcon" />
        <p id="title">싸피뱅크 입금 알림</p>
      </div>

      <span css={nameStyle}>모여방 {randomVerifyNumber}</span>
      <span css={descriptionStyle}> 님이 계좌로 1원을 입금했습니다.</span>
    </div>
  );
}
